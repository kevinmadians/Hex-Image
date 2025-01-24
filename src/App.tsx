import React, { useState, useRef, useCallback } from 'react';
import { Upload, Droplet, Copy, Image as ImageIcon, X, Download, Plus, Minus, Code2, Sparkles, Brush, Zap, Layers } from 'lucide-react';
// @ts-expect-error colorthief types are not available
import ColorThief from 'colorthief';

interface ColorInfo {
  hex: string;
  rgb: string;
}

interface Position {
  x: number;
  y: number;
}

interface AppProps {
  isDarkMode: boolean;
}

function App({ isDarkMode }: AppProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [pickedColor, setPickedColor] = useState<ColorInfo | null>(null);
  const [isPickingColor, setIsPickingColor] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<Position | null>(null);
  const [colorPalette, setColorPalette] = useState<string[]>([]);
  const [paletteSize, setPaletteSize] = useState<number>(6);
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const magnifierRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const rgbToHex = (r: number, g: number, b: number): string => 
    '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');

  const generatePalette = async (imageSrc: string) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageSrc;
    
    img.onload = async () => {
      const colorThief = new ColorThief();
      const palette = colorThief.getPalette(img, paletteSize) as [number, number, number][];
      const hexColors = palette.map(([r, g, b]) => rgbToHex(r, g, b));
      setColorPalette(hexColors);
    };
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageSrc = e.target?.result as string;
        setSelectedImage(imageSrc);
        generatePalette(imageSrc);
        setPickedColor({ hex: '', rgb: '' });
        
        // Draw image on canvas when loaded
        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          
          const maxWidth = Math.min(800, window.innerWidth - 32);
          const scale = maxWidth / img.width;
          
          if (scale < 1) {
            canvas.width = maxWidth;
            canvas.height = img.height * scale;
          } else {
            canvas.width = img.width;
            canvas.height = img.height;
          }
          
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = imageSrc;
      };
      reader.readAsDataURL(file);
    }
  };

  const getColorAtPosition = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = `#${[...pixel].slice(0, 3).map(x => x.toString(16).padStart(2, '0')).join('')}`;
    const rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;

    setPickedColor({ hex, rgb });
  }, []);

  const updateMagnifier = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    const magnifier = magnifierRef.current;
    if (!canvas || !magnifier || !isPickingColor) return;

    const ctx = canvas.getContext('2d');
    const magCtx = magnifier.getContext('2d');
    if (!ctx || !magCtx) return;

    const magnifierSize = 100;
    const zoomLevel = 4;
    const radius = magnifierSize / 2;

    magCtx.clearRect(0, 0, magnifierSize, magnifierSize);

    magCtx.save();
    magCtx.beginPath();
    magCtx.arc(radius, radius, radius, 0, 2 * Math.PI);
    magCtx.clip();

    // Calculate the area to zoom - centered exactly on the cursor position
    const sourceSize = magnifierSize / zoomLevel;
    const halfSourceSize = sourceSize / 2;
    
    // Ensure we stay within canvas bounds
    const sourceX = Math.max(0, Math.min(x - halfSourceSize, canvas.width - sourceSize));
    const sourceY = Math.max(0, Math.min(y - halfSourceSize, canvas.height - sourceSize));

    // Draw the magnified image
    magCtx.drawImage(
      canvas,
      sourceX,
      sourceY,
      sourceSize,
      sourceSize,
      0,
      0,
      magnifierSize,
      magnifierSize
    );

    // Draw center point indicator
    magCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    magCtx.lineWidth = 1;
    magCtx.beginPath();
    magCtx.moveTo(radius - 4, radius);
    magCtx.lineTo(radius + 4, radius);
    magCtx.moveTo(radius, radius - 4);
    magCtx.lineTo(radius, radius + 4);
    magCtx.stroke();

    // Draw border
    magCtx.strokeStyle = 'white';
    magCtx.lineWidth = 2;
    magCtx.beginPath();
    magCtx.arc(radius, radius, radius - 1, 0, 2 * Math.PI);
    magCtx.stroke();

    magCtx.restore();
  }, [isPickingColor]);

  const getMagnifierPosition = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { left: 0, top: 0 };

    const rect = canvas.getBoundingClientRect();
    const magnifierSize = 100;
    const margin = 20;

    // Position magnifier above cursor by default
    let left = x - magnifierSize / 2;
    let top = y - magnifierSize - margin;

    // Adjust horizontal position if too close to edges
    if (left < margin) {
      left = margin;
    } else if (left + magnifierSize > rect.width - margin) {
      left = rect.width - magnifierSize - margin;
    }

    // Flip to bottom if too close to top
    if (top < margin) {
      top = y + margin;
    }

    return { left, top };
  }, []);

  const handleCanvasMouseMove = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPickingColor) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    // Get the actual canvas coordinates
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    setCursorPosition({ 
      x: event.clientX - rect.left,
      y: event.clientY - rect.top 
    });
    updateMagnifier(x, y);
  }, [isPickingColor, updateMagnifier]);

  const handleCanvasMouseLeave = () => {
    setCursorPosition(null);
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPickingColor) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    
    getColorAtPosition(x, y);
  };

  const handleCopyClick = (color: string, type: string) => {
    if (color) {
      copyToClipboard(color, type);
      return;
    }
  };

  const handleColorClick = (color: string, type: string) => {
    if (color) {
      handleCopyClick(color, type);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates({ ...copiedStates, [type]: true });
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [type]: false }));
    }, 1000);
  };

  const downloadPalette = () => {
    const paletteText = colorPalette.join('\n');
    const blob = new Blob([paletteText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'color-palette.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const increasePaletteSize = () => {
    const newSize = Math.min(paletteSize + 1, 12);
    setPaletteSize(newSize);
    if (selectedImage) {
      generatePalette(selectedImage);
    }
  };

  const decreasePaletteSize = () => {
    const newSize = Math.max(paletteSize - 1, 2);
    setPaletteSize(newSize);
    if (selectedImage) {
      generatePalette(selectedImage);
    }
  };

  return (
    <>
      {!selectedImage && (
        <div className="mb-4">
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-blue-500/10 text-blue-300' : 'bg-blue-50 text-blue-600'}`}>
            <h2 className="text-sm font-medium mb-2">🎨 Quick Tips</h2>
            <ul className="text-xs space-y-1 list-disc list-inside">
              <li>Upload any image to extract its color palette</li>
              <li>Click on colors to copy their values</li>
              <li>Use the color picker to select specific colors</li>
              <li>Adjust palette size with + and - buttons</li>
            </ul>
          </div>
        </div>
      )}
      
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl ${
        isDarkMode 
          ? 'shadow-lg shadow-gray-900/30' 
          : 'shadow-lg shadow-blue-900/10'
      } ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border`}>
        <div className="p-3">
          {!selectedImage ? (
            <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-all duration-300 ${
              isDarkMode 
                ? 'border-gray-700 hover:border-gray-600' 
                : 'border-gray-200 hover:border-gray-300'
            }`}>
              <div className="max-w-xs mx-auto space-y-3">
                <div className="flex justify-center">
                  <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <ImageIcon className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  </div>
                </div>
                <div>
                  <h3 className={`text-base font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    Upload an image
                  </h3>
                  <p className={`mt-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Click or drag and drop
                  </p>
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className={`inline-flex items-center px-3 py-1.5 rounded-lg cursor-pointer transition-colors text-sm ${
                      isDarkMode
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
                    }`}
                  >
                    <Upload className="h-3.5 w-3.5 mr-1.5" />
                    Choose Image
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="relative" ref={containerRef}>
                <canvas
                  ref={canvasRef}
                  className={`w-full h-auto rounded-lg shadow-inner ${
                    isPickingColor ? 'cursor-none' : 'cursor-default'
                  } ${isDarkMode ? 'shadow-black/10' : 'shadow-gray-200'}`}
                  onClick={handleCanvasClick}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseLeave={handleCanvasMouseLeave}
                />
                {!isPickingColor && (
                  <div className="absolute top-2 right-2 flex items-center gap-2">
                    <label
                      htmlFor="change-image"
                      className={`p-1.5 rounded-lg cursor-pointer ${
                        isDarkMode
                          ? 'bg-gray-800/90 text-gray-400 hover:text-white hover:bg-gray-700/90'
                          : 'bg-white/90 text-gray-500 hover:text-blue-500 hover:bg-white'
                      } backdrop-blur-sm shadow-sm transition-colors`}
                    >
                      <input
                        type="file"
                        id="change-image"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Upload className="h-3.5 w-3.5" />
                    </label>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className={`p-1.5 rounded-lg ${
                        isDarkMode
                          ? 'bg-gray-800/90 text-gray-400 hover:text-white hover:bg-gray-700/90'
                          : 'bg-white/90 text-gray-500 hover:text-red-500 hover:bg-white'
                      } backdrop-blur-sm shadow-sm transition-colors`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
                {isPickingColor && cursorPosition && (
                  <>
                    <div 
                      className="absolute pointer-events-none"
                      style={{
                        left: `${cursorPosition.x - 10}px`,
                        top: `${cursorPosition.y - 10}px`,
                        width: '20px',
                        height: '20px'
                      }}
                    >
                      <div className="absolute w-full h-0.5 bg-white top-1/2 -translate-y-1/2" />
                      <div className="absolute h-full w-0.5 bg-white left-1/2 -translate-x-1/2" />
                    </div>
                    <div 
                      className="absolute pointer-events-none rounded-full overflow-hidden"
                      style={{
                        left: getMagnifierPosition(cursorPosition.x, cursorPosition.y).left,
                        top: getMagnifierPosition(cursorPosition.x, cursorPosition.y).top,
                        width: '100px',
                        height: '100px'
                      }}
                    >
                      <canvas
                        ref={magnifierRef}
                        width="100"
                        height="100"
                        className="rounded-full"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-2">
                {/* Pick Color Button */}
                <div className="flex justify-center">
                  <button
                    onClick={() => setIsPickingColor(!isPickingColor)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isPickingColor
                        ? 'bg-blue-600 text-white ring-2 ring-blue-500 ring-offset-2'
                        : isDarkMode 
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <Droplet className="h-3.5 w-3.5 inline mr-1.5" />
                    {isPickingColor ? 'Picking Color...' : 'Pick Color'}
                  </button>
                </div>
                {isPickingColor && (
                  <div className="flex justify-center">
                    <div className={`px-2.5 py-1 rounded-full text-xs ${
                      isDarkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-600'
                    }`}>
                      🟢 Pick Color is Active
                    </div>
                  </div>
                )}

                {/* Color Palette */}
                {colorPalette.length > 0 && (
                  <div className="max-w-xs mx-auto w-full">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`text-xs font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        PALETTE ({paletteSize})
                      </h3>
                      <div className="flex items-center gap-1 z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            decreasePaletteSize();
                          }}
                          className={`p-1.5 rounded-md ${
                            isDarkMode 
                              ? 'text-gray-300 hover:text-white hover:bg-gray-700/80 active:bg-gray-600' 
                              : 'text-gray-600 hover:bg-gray-100'
                          } transition-all cursor-pointer z-10`}
                          title="Decrease palette size"
                          type="button"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            increasePaletteSize();
                          }}
                          className={`p-1.5 rounded-md ${
                            isDarkMode 
                              ? 'text-gray-300 hover:text-white hover:bg-gray-700/80 active:bg-gray-600' 
                              : 'text-gray-600 hover:bg-gray-100'
                          } transition-all cursor-pointer z-10`}
                          title="Increase palette size"
                          type="button"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadPalette();
                          }}
                          className={`p-1.5 rounded-md ${
                            isDarkMode 
                              ? 'text-gray-300 hover:text-white hover:bg-gray-700/80 active:bg-gray-600' 
                              : 'text-gray-600 hover:bg-gray-100'
                          } transition-all cursor-pointer z-10`}
                          title="Download palette"
                          type="button"
                        >
                          <Download className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex rounded-md overflow-hidden h-5">
                      {colorPalette.map((color, index) => (
                        <div
                          key={index}
                          className="group relative flex-1 cursor-pointer hover:z-10 transition-all"
                          onClick={() => handleColorClick(color, `color-${index}`)}
                        >
                          <div 
                            className="w-full h-full"
                            style={{ backgroundColor: color }}
                          />
                          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center bg-black/20`}>
                            <Copy className="h-2.5 w-2.5 text-white" />
                          </div>
                          {copiedStates[`color-${index}`] && (
                            <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
                              <span className="px-2 py-1 bg-black/90 text-white text-[10px] rounded shadow-lg backdrop-blur-sm">
                                Copied!
                              </span>
                            </div>
                          )}
                          <div className={`absolute -bottom-5 left-1/2 transform -translate-x-1/2 px-1.5 py-0.5 rounded text-[10px] ${
                            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                          } opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap`}>
                            {color}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedImage && (
                  <div className={`${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  } rounded-lg p-2 animate-fade-in mt-2`}>
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-lg shadow-inner ${isDarkMode ? 'ring-1 ring-white/10' : 'ring-1 ring-black/5'}`}
                        style={{ backgroundColor: pickedColor?.hex || 'transparent' }}
                      />
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <div>
                          <div className={`text-[10px] font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            HEX
                          </div>
                          <div className="flex items-center space-x-1">
                            <code className={`px-2 py-1 rounded text-xs flex-1 font-medium ${
                              isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900 border border-gray-200'
                            }`}>
                              {pickedColor?.hex || '-'}
                            </code>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (pickedColor?.hex) {
                                  handleCopyClick(pickedColor.hex, 'HEX');
                                }
                              }}
                              className={`p-1 rounded relative ${
                                isDarkMode
                                  ? 'text-gray-400 hover:text-white hover:bg-gray-600'
                                  : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100'
                              } transition-colors ${!pickedColor?.hex ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              {copiedStates['HEX'] && (
                                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/90 text-white text-[10px] rounded shadow-lg backdrop-blur-sm animate-fade-in">
                                  Copied!
                                </span>
                              )}
                              <Copy className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        <div>
                          <div className={`text-[10px] font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            RGB
                          </div>
                          <div className="flex items-center space-x-1">
                            <code className={`px-2 py-1 rounded text-xs flex-1 font-medium ${
                              isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900 border border-gray-200'
                            }`}>
                              {pickedColor?.rgb || '-'}
                            </code>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (pickedColor?.rgb) {
                                  handleCopyClick(pickedColor.rgb, 'RGB');
                                }
                              }}
                              className={`p-1 rounded relative ${
                                isDarkMode
                                  ? 'text-gray-400 hover:text-white hover:bg-gray-600'
                                  : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100'
                              } transition-colors ${!pickedColor?.rgb ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              {copiedStates['RGB'] && (
                                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/90 text-white text-[10px] rounded shadow-lg backdrop-blur-sm animate-fade-in">
                                  Copied!
                                </span>
                              )}
                              <Copy className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-2 text-center">
        <p className={`text-xs italic ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          Your images are processed locally and are never uploaded to any server
        </p>
      </div>

      {/* Description Section */}
      <div className={`mt-8 ${isDarkMode ? 'bg-gray-800 animate-border-glow' : 'bg-white'} rounded-xl shadow-lg ${isDarkMode ? 'shadow-gray-900/50' : 'shadow-blue-900/5'} border p-6 relative overflow-hidden`}>
        <div className="relative z-[2]">
          <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
            <Sparkles className="h-5 w-5 text-blue-500" />
            About Image Hex
          </h2>
          <div className={`space-y-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <div className="flex gap-3">
              <div className="mt-1">
                <Brush className="h-4 w-4 text-purple-500" />
              </div>
              <p>
                Image Hex is a powerful tool designed to help designers, artists, and creators extract beautiful color palettes from any image. Whether you're working on a website, digital art, or any creative project, our tool makes it easy to identify and capture the perfect colors.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="mt-1">
                <Zap className="h-4 w-4 text-yellow-500" />
              </div>
              <p>
                With features like precise color picking, automatic palette generation, and instant HEX/RGB color codes, you can quickly build harmonious color schemes from your favorite images. All processing is done locally in your browser, ensuring your images remain private and secure.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className={`mt-6 ${isDarkMode ? 'bg-gray-800 animate-border-glow' : 'bg-white'} rounded-xl shadow-lg ${isDarkMode ? 'shadow-gray-900/50' : 'shadow-blue-900/5'} border p-6 relative overflow-hidden`}>
        <div className="relative z-[2]">
          <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
            <Layers className="h-5 w-5 text-blue-500" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="mt-1">
                <Code2 className="h-4 w-4 text-indigo-500" />
              </div>
              <div>
                <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  How does the color picker work?
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Simply upload an image and use the color picker tool to select any color from the image. You'll get both HEX and RGB values instantly. You can also generate automatic color palettes from your images.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="mt-1">
                <ImageIcon className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  What image formats are supported?
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  We support all common image formats including PNG, JPEG, GIF, and WebP. Images are processed locally in your browser for optimal performance and privacy.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="mt-1">
                <Download className="h-4 w-4 text-teal-500" />
              </div>
              <div>
                <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  Can I save my color palettes?
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Yes! You can download your generated color palettes as a text file containing all the color codes. You can also copy individual color codes by clicking on them.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="mt-1">
                <ImageIcon className="h-4 w-4 text-red-500" />
              </div>
              <div>
                <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  Is there a limit to the image size?
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  For optimal performance, images are automatically resized while maintaining their aspect ratio. This ensures smooth color picking and palette generation regardless of the original image size.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;