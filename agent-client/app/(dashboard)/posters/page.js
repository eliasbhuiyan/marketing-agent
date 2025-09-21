'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Upload, 
  Image as ImageIcon, 
  Palette, 
  Type, 
  Sparkles,
  Download,
  Share2,
  Calendar,
  Eye,
  RotateCcw,
  Settings
} from 'lucide-react';
import apiClient from '@/lib/api';

export default function PostersPage() {
  const [productImage, setProductImage] = useState(null);
  const [modelImage, setModelImage] = useState(null);
  const [useSampleModel, setUseSampleModel] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [designMode, setDesignMode] = useState('template'); // 'template' or 'custom'
  const [customPrompt, setCustomPrompt] = useState('');
  const productInputRef = useRef(null);
  const modelInputRef = useRef(null);
  const [brandSettings, setBrandSettings] = useState({
    primaryColor: '#3B82F6',
    secondaryColor: '#1E40AF',
    font: 'Inter',
    style: 'modern',
    tone: 'professional'
  });
  const [generatedPoster, setGeneratedPoster] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCaption, setGeneratedCaption] = useState("");
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);
  const [captionOptions, setCaptionOptions] = useState({ tone: 'professional', platform: 'instagram', keywords: '', language: 'en' });

  const templates = [
    { id: 1, name: 'Sale Banner', category: 'Sale', preview: '/api/placeholder/300/200' },
    { id: 2, name: 'Product Launch', category: 'New Product', preview: '/api/placeholder/300/200' },
    { id: 3, name: 'Festive Design', category: 'Festival', preview: '/api/placeholder/300/200' },
    { id: 4, name: 'Minimal Style', category: 'Minimal', preview: '/api/placeholder/300/200' },
    { id: 5, name: 'Fashion Focus', category: 'Fashion', preview: '/api/placeholder/300/200' },
    { id: 6, name: 'Tech Product', category: 'Technology', preview: '/api/placeholder/300/200' }
  ];

  const handleProductUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setProductImage({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      type: 'product'
    });
  };

  const handleModelUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setModelImage({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      type: 'model'
    });
  };

  const handleGeneratePoster = async () => {
    if (!productImage) return;    
    // setIsGenerating(true);
    
    // Log which design mode is being used
    console.log('Design Mode:', designMode);
    if (designMode === 'template') {
      console.log('Selected Template:', selectedTemplate);
    } else {
      console.log('Custom Prompt:', customPrompt);
    }
     
    
    // Simulate AI generation
    const res = await apiClient.ai.posterDesign(productImage.file, modelImage.file);
    console.log(res);

    const data = await res.json();
    console.log(data);
    
      setGeneratedPoster({
        id: Date.now(),
        url: '/api/placeholder/800/600',
        caption: designMode === 'template' 
          ? `Check out our amazing new product! Perfect for your lifestyle. #NewProduct #Lifestyle #Quality` 
          : `Custom design created with AI: ${customPrompt.substring(0, 30)}... #CustomDesign #AICreated`
      });
      setIsGenerating(false);
  };

  const handleSchedulePost = () => {
    // Handle scheduling logic
    console.log('Scheduling post...');
  };

  const handleGenerateCaption = () => {
    setIsGeneratingCaption(true);
    const { tone, platform, keywords, language } = captionOptions;
    setTimeout(() => {
      const kw = keywords ? ` ${keywords.split(',').map(k=>`#${k.trim().replace(/\s+/g,'')}`).join(' ')}` : '';
      const base = `Experience the new standard in quality. Elevate your ${platform} with style.`;
      const tonePrefix = tone === 'playful' ? '✨' : tone === 'friendly' ? '😊' : tone === 'luxury' ? '💎' : '✅';
      const caption = `${tonePrefix} ${base} ${kw}`.trim();
      const tag = language !== 'en' ? ` [${language.toUpperCase()}]` : '';
      setGeneratedCaption(caption + tag);
      setIsGeneratingCaption(false);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className='text-center'>
        <h1 className="text-3xl font-bold text-white">Poster & Design Creator</h1>
        <p className="text-white/80 mt-2">Create stunning posters and banners with AI-powered design tools</p>
      </div>

      {/* Row 1: Product + Model */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Product Image Upload (Required) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              Product Image (Required)
            </CardTitle>
            <CardDescription>The main product to feature in your poster</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-4">Upload a clear product image</p>
              <input
                ref={productInputRef}
                type="file"
                accept="image/*"
                onChange={handleProductUpload}
                className="hidden"
              />
              <Button variant="outline" className="cursor-pointer" onClick={() => productInputRef.current?.click()}>
                {productImage ? 'Replace Image' : 'Choose File'}
              </Button>
            </div>
            {productImage && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Selected Product</h4>
                <img src={productImage.url} alt="Product" className="w-full h-32 object-cover rounded-lg" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Model Image Upload (Optional) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ImageIcon className="h-5 w-5 mr-2" />
              Model Image (Optional)
            </CardTitle>
            <CardDescription>Use a model to enhance lifestyle context</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Use sample model image</Label>
              <input
                type="checkbox"
                checked={useSampleModel}
                onChange={(e) => setUseSampleModel(e.target.checked)}
                className="rounded"
              />
            </div>
            {!useSampleModel && (
              <>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-4">Upload an optional model image</p>
                  <input
                    ref={modelInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleModelUpload}
                    className="hidden"
                  />
                  <Button variant="outline" className="cursor-pointer" onClick={() => modelInputRef.current?.click()}>
                    {modelImage ? 'Replace Image' : 'Choose File'}
                  </Button>
                </div>
                {modelImage && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Selected Model</h4>
                    <img src={modelImage.url} alt="Model" className="w-full h-32 object-cover rounded-lg" />
                  </div>
                )}
              </>
            )}
            {useSampleModel && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Sample Model Preview</h4>
                <div className="w-full h-32 rounded-lg bg-gray-100 flex items-center justify-center">
                  <span className="text-sm text-gray-500">Sample model will be used</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Brand Settings + Templates */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Brand Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="h-5 w-5 mr-2" />
              Brand Settings
            </CardTitle>
            <CardDescription>Customize your brand identity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  type="color"
                  id="primary-color"
                  value={brandSettings.primaryColor}
                  onChange={(e) => setBrandSettings({...brandSettings, primaryColor: e.target.value})}
                  className="w-10 h-10 rounded border"
                />
                <Input
                  value={brandSettings.primaryColor}
                  onChange={(e) => setBrandSettings({...brandSettings, primaryColor: e.target.value})}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="secondary-color">Secondary Color</Label>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  type="color"
                  id="secondary-color"
                  value={brandSettings.secondaryColor}
                  onChange={(e) => setBrandSettings({...brandSettings, secondaryColor: e.target.value})}
                  className="w-10 h-10 rounded border"
                />
                <Input
                  value={brandSettings.secondaryColor}
                  onChange={(e) => setBrandSettings({...brandSettings, secondaryColor: e.target.value})}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="font">Font Family</Label>
              <select
                id="font"
                value={brandSettings.font}
                onChange={(e) => setBrandSettings({...brandSettings, font: e.target.value})}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Poppins">Poppins</option>
                <option value="Montserrat">Montserrat</option>
              </select>
            </div>

            <div>
              <Label htmlFor="style">Style</Label>
              <select
                id="style"
                value={brandSettings.style}
                onChange={(e) => setBrandSettings({...brandSettings, style: e.target.value})}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              >
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
                <option value="minimal">Minimal</option>
                <option value="bold">Bold</option>
              </select>
            </div>

            <div>
              <Label htmlFor="tone">Tone</Label>
              <select
                id="tone"
                value={brandSettings.tone}
                onChange={(e) => setBrandSettings({...brandSettings, tone: e.target.value})}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              >
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="playful">Playful</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Templates Section */}
        <Card>
          <CardHeader>
            <CardTitle>Design Options</CardTitle>
            <CardDescription>Choose a template or create a custom design with AI</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Design Mode Toggle */}
            <div className="flex border rounded-lg mb-4 overflow-hidden">
              <button
                className={`flex-1 py-2 px-4 text-center ${
                  designMode === 'template' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setDesignMode('template')}
              >
                Choose Template
              </button>
              <button
                className={`flex-1 py-2 px-4 text-center ${
                  designMode === 'custom' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setDesignMode('custom')}
              >
                Custom Prompt
              </button>
            </div>

            {/* Template Selection */}
            {designMode === 'template' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`cursor-pointer rounded-lg border-2 p-2 transition-all ${
                      selectedTemplate?.id === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <div className="aspect-[3/2] bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{template.name}</p>
                      <p className="text-xs text-gray-500">{template.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Custom Prompt */}
            {designMode === 'custom' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="custom-prompt">Describe your design</Label>
                  <textarea
                    id="custom-prompt"
                    className="w-full mt-1 p-3 border border-gray-300 rounded-md h-28 resize-y"
                    placeholder="Describe the design you want, e.g., 'A minimalist product banner with blue gradient background and elegant typography'"
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                  />
                </div>
                <div className="text-sm text-gray-500">
                  <p>Tips:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Be specific about colors, style, and layout</li>
                    <li>Mention text placement and emphasis</li>
                    <li>Describe the mood or feeling you want to convey</li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Generate Button */}
      <Button 
        onClick={handleGeneratePoster}
        disabled={!productImage || isGenerating || (designMode === 'custom' && !customPrompt.trim())}
        className="w-full"
        size="lg"
      >
        {isGenerating ? (
          <>
            <Sparkles className="h-5 w-5 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5 mr-2" />
            Generate {designMode === 'template' ? 'Poster from Template' : 'Custom Design'}
          </>
        )}
      </Button>

      {/* Output: Preview, Caption, Schedule */}
      <div className="space-y-6">
        {/* Generated Poster Preview */}
        {generatedPoster ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  Generated Poster
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <img
                  src={generatedPoster.url}
                  alt="Generated Poster"
                  className="max-w-full h-auto mx-auto rounded-lg shadow-lg"
                />
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Poster Generated Yet</h3>
              <p className="text-gray-600">Upload images and click &quot;Generate Poster&quot; to create your design</p>
            </CardContent>
          </Card>
        )}

        {/* Caption Generator */}
        {generatedPoster && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Type className="h-5 w-5 mr-2" />
                  Caption Generator
                </div>
                <Button size="sm" onClick={handleGenerateCaption} disabled={isGeneratingCaption}>
                  {isGeneratingCaption ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Caption
                    </>
                  )}
                </Button>
              </CardTitle>
              <CardDescription>Generate a caption for this poster with custom options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div>
                  <Label htmlFor="cap-tone">Tone</Label>
                  <select
                    id="cap-tone"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    value={captionOptions.tone}
                    onChange={(e)=>setCaptionOptions({...captionOptions, tone: e.target.value})}
                  >
                    <option value="professional">Professional</option>
                    <option value="friendly">Friendly</option>
                    <option value="playful">Playful</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="cap-platform">Platform</Label>
                  <select
                    id="cap-platform"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    value={captionOptions.platform}
                    onChange={(e)=>setCaptionOptions({...captionOptions, platform: e.target.value})}
                  >
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">Twitter/X</option>
                    <option value="tiktok">TikTok</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="cap-keywords">Keywords (comma separated)</Label>
                  <Input
                    id="cap-keywords"
                    placeholder="e.g., newarrival, summer, limited"
                    value={captionOptions.keywords}
                    onChange={(e)=>setCaptionOptions({...captionOptions, keywords: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="cap-lang">Language</Label>
                  <select
                    id="cap-lang"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    value={captionOptions.language}
                    onChange={(e)=>setCaptionOptions({...captionOptions, language: e.target.value})}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="hi">Hindi</option>
                    <option value="bn">Bengali</option>
                    <option value="ar">Arabic</option>
                    <option value="pt">Portuguese</option>
                    <option value="ru">Russian</option>
                    <option value="ja">Japanese</option>
                  </select>
                </div>
              </div>
              {generatedCaption && (
                <div className="mb-4">
                  <Label htmlFor="cap-edit">Edit Caption</Label>
                  <textarea
                    id="cap-edit"
                    className="w-full mt-1 p-3 border border-gray-300 rounded-md h-28 resize-y"
                    value={generatedCaption}
                    onChange={(e)=>setGeneratedCaption(e.target.value)}
                  />
                  <div className="mt-1 text-xs text-gray-500">{generatedCaption.length} characters</div>
                </div>
              )}
              <div className="flex space-x-2">
                <Button variant="" size="sm" onClick={handleGenerateCaption} disabled={isGeneratingCaption}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
                <Button variant="" size="sm" onClick={()=>generatedCaption && navigator.clipboard.writeText(generatedCaption)} disabled={!generatedCaption || generatedCaption.trim().length===0}>
                  Copy Caption
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Schedule & Publish */}
        {generatedPoster && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Schedule & Publish
              </CardTitle>
              <CardDescription>Schedule your poster to social media platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Select Platforms</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {['Instagram', 'Facebook', 'LinkedIn', 'Twitter', 'TikTok'].map((platform) => (
                    <label key={platform} className="flex items-center space-x-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{platform}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="schedule-date">Schedule Date</Label>
                  <Input
                    id="schedule-date"
                    type="date"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="schedule-time">Schedule Time</Label>
                  <Input
                    id="schedule-time"
                    type="time"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button onClick={handleSchedulePost} className="flex-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Post
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Publish Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
