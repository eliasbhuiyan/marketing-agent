"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sparkles,
  Copy,
  Calendar,
  FileText,
  PenTool,
  BarChart,
} from "lucide-react";
import apiClient from "@/lib/api";
import dynamic from "next/dynamic";
import BlogHeadingPopup from "@/components/BlogHeadingPopup";
import ContentPublisher from "@/components/ContentPublisher";

// Dynamically import TiptapEditor to avoid SSR issues
const TiptapEditor = dynamic(() => import("@/components/TiptapEditor"), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

export default function BlogGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(`<h1>Beauty in Nature</h1>
<p>Nature has an extraordinary way of captivating our senses, offering a timeless source of inspiration and tranquility. From the towering peaks of mountains to the gentle crash of ocean waves, the beauty in nature reminds us of the world's inherent wonders. In this blog, we'll explore various landscapes that showcase this splendor and discuss how connecting with nature can enhance our well-being.</p>
<p>Whether you're a seasoned adventurer or someone seeking solace in everyday scenery, embracing the beauty of nature can transform your perspective. Let's dive into some of the most mesmerizing aspects of the natural world.</p>

<h2>Introduction to the Captivating Beauty in Nature</h2>
<img src="https://pixabay.com/get/g8d8146a5475caeaa56b1d3ce090891683fe61851f1fef38057b9827dce26875eb5ec32b26374ea4b8ede73401b7338bebe82f8093ea54acd245612b838f588e3_640.jpg" alt="Introduction to the Captivating Beauty in Nature"/>
<p>The beauty in nature is a universal language that speaks to the soul, evoking feelings of awe and peace. It's in the vibrant colors of a sunrise, the intricate patterns of leaves, or the symphony of birdsong at dawn. This natural splendor has inspired artists, poets, and thinkers for centuries, reminding us of our place in a larger, harmonious ecosystem.</p>
<p>Today, as urban life accelerates, reconnecting with nature becomes essential. Simple walks in parks or hikes in the wilderness can recharge our spirits. Exploring these elements helps us appreciate the delicate balance that sustains our planet.</p>

<h2>Discovering Hidden Gems: Majestic Mountains and Lush Forests</h2>
<img src="https://pixabay.com/get/g668dd64d608c5570b3137c58afa8b32e47d5f346707b1cb6babf06c11f6381fb555da8a5270b3e7442ed5e20ddf978d38a8764a8301b7ae693d348d9ef539ea1_640.jpg" alt="Discovering Hidden Gems: Majestic Mountains and Lush Forests"/>
<p>Majestic mountains stand as eternal sentinels, their rugged peaks piercing the sky and offering breathtaking vistas. Places like the Rockies or the Alps showcase layers of rock formations sculpted by time, where fresh air invigorates the lungs. Hiking these trails reveals hidden gems, from alpine meadows blooming with wildflowers to crystal-clear streams cascading down slopes.</p>
<p>Lush forests, teeming with life, provide a verdant escape into nature's embrace. Towering trees form natural cathedrals, filtering sunlight into ethereal patterns on the forest floor. Biodiversity thrives here, with birds, mammals, and insects creating a living tapestry that underscores the richness of natural ecosystems.</p>
<p>Visiting these areas encourages mindfulness, as the quiet grandeur prompts reflection. Whether photographing a misty valley or breathing in the earthy scent of pine, these experiences deepen our connection to the environment.</p>

<h2>Coastal Charms: Waves, Beaches, and Sunset Serenity</h2>
<img src="https://pixabay.com/get/gabacad82bcc557609d497e6dbd00cfa8d06aeb6513f831ee2084ea9bb36d819c71fbfde145983f5371d7b9b4a918cbd22e425b0c5588bd72071db8659f2ac1f8_640.jpg" alt="Coastal Charms: Waves, Beaches, and Sunset Serenity"/>
<p>Coastal regions captivate with their rhythmic waves lapping against sandy beaches, a soothing soundtrack to relaxation. The ocean's vast expanse, dotted with seashells and driftwood, invites barefoot strolls that wash away daily stresses. Nature's artistry shines in the tides, carving intricate designs in the sand and revealing marine life at low tide.</p>
<p>Sunset serenity along the shore transforms ordinary evenings into magical spectacles. The sky ignites in hues of orange, pink, and purple, reflecting off the water in a symphony of colors. These moments foster a sense of wonder, reminding us of nature's power to evoke deep emotions.</p>
<p>Beaches also serve as gateways to underwater worlds, where snorkeling uncovers coral reefs and colorful fish. Protecting these coastal charms is crucial, as they face threats from climate change, making mindful visits all the more rewarding.</p>

<h2>Why Embracing Nature's Beauty Enriches Our Daily Lives</h2>
<img src="https://pixabay.com/get/g1b1e3b2f1267e5c679fcbbe2dee70d1f671320177fdef351c785b92a4cde39ff8025fdc7b404100bf6522a8e58cb56914a2ffc2698bb73a648c9aa0dc223f339_640.jpg" alt="Why Embracing Nature's Beauty Enriches Our Daily Lives"/>
<p>Embracing the beauty in nature offers profound benefits for mental and physical health. Studies show that time spent outdoors reduces stress hormones and boosts mood through exposure to natural light and fresh air. Incorporating nature into routines, like morning jogs in green spaces, can improve focus and creativity.</p>
<p>In a fast-paced world, nature acts as a reset button, promoting mindfulness and gratitude. Activities such as birdwatching or gardening connect us to seasonal changes, fostering a sense of continuity and purpose. This enrichment extends to relationships, as shared outdoor experiences strengthen bonds.</p>
<p>Ultimately, appreciating nature encourages sustainable living. By valuing its beauty, we become better stewards, advocating for conservation efforts that preserve these wonders for future generations.</p>

<p>In conclusion, the beauty of nature is not just a visual feast but a vital source of renewal. From mountains and forests to beaches and beyond, these landscapes invite us to pause and reflect. By weaving nature into our lives, we unlock a deeper sense of joy and harmony.</p>

<h2>FAQ in Beauty in Nature</h2>
<h3>What are the best ways to experience the beauty in nature for beginners?</h3>
<p>For beginners, start with local parks or nature trails that offer easy access and guided paths. Apps like AllTrails can help find beginner-friendly routes near you. Pack essentials like water and comfortable shoes, and focus on sensory experiences—listen to the wind, feel the textures of leaves—to fully immerse yourself.</p>

<h3>How does nature's beauty impact mental health?</h3>
<p>Nature's beauty significantly reduces anxiety and depression by lowering cortisol levels, as supported by recent studies from the American Psychological Association. Even short exposures, like a 20-minute walk in a green space, can enhance mood and cognitive function. Incorporating biophilic design in homes, such as indoor plants, mimics these benefits indoors.</p>

<h3>Are there trending eco-friendly ways to explore natural beauty in 2023?</h3>
<p>In 2023, trends include sustainable hiking gear made from recycled materials and virtual reality tours for low-impact exploration via platforms like Google Earth. Eco-tourism destinations, such as national parks with carbon-neutral programs, are popular. Always follow Leave No Trace principles to minimize your footprint while enjoying nature's splendor.</p>

<h3>Which global destinations best showcase nature's captivating beauty?</h3>
<p>Iconic spots like New Zealand's fjords, Iceland's geothermal landscapes, and Japan's cherry blossom forests highlight diverse natural beauty. For accessibility, consider U.S. national parks like Yellowstone for geysers and wildlife. Plan visits during off-peak seasons to avoid crowds and support conservation through park fees.</p>
<h3>Can urban dwellers still appreciate beauty in nature daily?</h3>
<p>Yes, urban dwellers can find nature's beauty in rooftop gardens, community green spaces, or even stargazing in city parks. Initiatives like urban forestry projects in cities such as Singapore provide accessible oases. Simple practices, like window gardening or weekend escapes to nearby reserves, bridge the gap effectively.</p>
TiptapEditor.js:140 content <h1>Beauty in Nature</h1>
<p>Nature has an extraordinary way of captivating our senses, offering a timeless source of inspiration and tranquility. From the towering peaks of mountains to the gentle crash of ocean waves, the beauty in nature reminds us of the world's inherent wonders. In this blog, we'll explore various landscapes that showcase this splendor and discuss how connecting with nature can enhance our well-being.</p>
<p>Whether you're a seasoned adventurer or someone seeking solace in everyday scenery, embracing the beauty of nature can transform your perspective. Let's dive into some of the most mesmerizing aspects of the natural world.</p>

<h2>Introduction to the Captivating Beauty in Nature</h2>
<img src="https://pixabay.com/get/g8d8146a5475caeaa56b1d3ce090891683fe61851f1fef38057b9827dce26875eb5ec32b26374ea4b8ede73401b7338bebe82f8093ea54acd245612b838f588e3_640.jpg" alt="Introduction to the Captivating Beauty in Nature"/>
<p>The beauty in nature is a universal language that speaks to the soul, evoking feelings of awe and peace. It's in the vibrant colors of a sunrise, the intricate patterns of leaves, or the symphony of birdsong at dawn. This natural splendor has inspired artists, poets, and thinkers for centuries, reminding us of our place in a larger, harmonious ecosystem.</p>
<p>Today, as urban life accelerates, reconnecting with nature becomes essential. Simple walks in parks or hikes in the wilderness can recharge our spirits. Exploring these elements helps us appreciate the delicate balance that sustains our planet.</p>

<h2>Discovering Hidden Gems: Majestic Mountains and Lush Forests</h2>
<img src="https://pixabay.com/get/g668dd64d608c5570b3137c58afa8b32e47d5f346707b1cb6babf06c11f6381fb555da8a5270b3e7442ed5e20ddf978d38a8764a8301b7ae693d348d9ef539ea1_640.jpg" alt="Discovering Hidden Gems: Majestic Mountains and Lush Forests"/>
<p>Majestic mountains stand as eternal sentinels, their rugged peaks piercing the sky and offering breathtaking vistas. Places like the Rockies or the Alps showcase layers of rock formations sculpted by time, where fresh air invigorates the lungs. Hiking these trails reveals hidden gems, from alpine meadows blooming with wildflowers to crystal-clear streams cascading down slopes.</p>
<p>Lush forests, teeming with life, provide a verdant escape into nature's embrace. Towering trees form natural cathedrals, filtering sunlight into ethereal patterns on the forest floor. Biodiversity thrives here, with birds, mammals, and insects creating a living tapestry that underscores the richness of natural ecosystems.</p>
<p>Visiting these areas encourages mindfulness, as the quiet grandeur prompts reflection. Whether photographing a misty valley or breathing in the earthy scent of pine, these experiences deepen our connection to the environment.</p>

<h2>Coastal Charms: Waves, Beaches, and Sunset Serenity</h2>
<img src="https://pixabay.com/get/gabacad82bcc557609d497e6dbd00cfa8d06aeb6513f831ee2084ea9bb36d819c71fbfde145983f5371d7b9b4a918cbd22e425b0c5588bd72071db8659f2ac1f8_640.jpg" alt="Coastal Charms: Waves, Beaches, and Sunset Serenity"/>
<p>Coastal regions captivate with their rhythmic waves lapping against sandy beaches, a soothing soundtrack to relaxation. The ocean's vast expanse, dotted with seashells and driftwood, invites barefoot strolls that wash away daily stresses. Nature's artistry shines in the tides, carving intricate designs in the sand and revealing marine life at low tide.</p>
<p>Sunset serenity along the shore transforms ordinary evenings into magical spectacles. The sky ignites in hues of orange, pink, and purple, reflecting off the water in a symphony of colors. These moments foster a sense of wonder, reminding us of nature's power to evoke deep emotions.</p>
<p>Beaches also serve as gateways to underwater worlds, where snorkeling uncovers coral reefs and colorful fish. Protecting these coastal charms is crucial, as they face threats from climate change, making mindful visits all the more rewarding.</p>

<h2>Why Embracing Nature's Beauty Enriches Our Daily Lives</h2>
<img src="https://pixabay.com/get/g1b1e3b2f1267e5c679fcbbe2dee70d1f671320177fdef351c785b92a4cde39ff8025fdc7b404100bf6522a8e58cb56914a2ffc2698bb73a648c9aa0dc223f339_640.jpg" alt="Why Embracing Nature's Beauty Enriches Our Daily Lives"/>
<p>Embracing the beauty in nature offers profound benefits for mental and physical health. Studies show that time spent outdoors reduces stress hormones and boosts mood through exposure to natural light and fresh air. Incorporating nature into routines, like morning jogs in green spaces, can improve focus and creativity.</p>
<p>In a fast-paced world, nature acts as a reset button, promoting mindfulness and gratitude. Activities such as birdwatching or gardening connect us to seasonal changes, fostering a sense of continuity and purpose. This enrichment extends to relationships, as shared outdoor experiences strengthen bonds.</p>
<p>Ultimately, appreciating nature encourages sustainable living. By valuing its beauty, we become better stewards, advocating for conservation efforts that preserve these wonders for future generations.</p>

<p>In conclusion, the beauty of nature is not just a visual feast but a vital source of renewal. From mountains and forests to beaches and beyond, these landscapes invite us to pause and reflect. By weaving nature into our lives, we unlock a deeper sense of joy and harmony.</p>

<h2>FAQ in Beauty in Nature</h2>
<h3>What are the best ways to experience the beauty in nature for beginners?</h3>
<p>For beginners, start with local parks or nature trails that offer easy access and guided paths. Apps like AllTrails can help find beginner-friendly routes near you. Pack essentials like water and comfortable shoes, and focus on sensory experiences—listen to the wind, feel the textures of leaves—to fully immerse yourself.</p>

<h3>How does nature's beauty impact mental health?</h3>
<p>Nature's beauty significantly reduces anxiety and depression by lowering cortisol levels, as supported by recent studies from the American Psychological Association. Even short exposures, like a 20-minute walk in a green space, can enhance mood and cognitive function. Incorporating biophilic design in homes, such as indoor plants, mimics these benefits indoors.</p>

<h3>Are there trending eco-friendly ways to explore natural beauty in 2023?</h3>
<p>In 2023, trends include sustainable hiking gear made from recycled materials and virtual reality tours for low-impact exploration via platforms like Google Earth. Eco-tourism destinations, such as national parks with carbon-neutral programs, are popular. Always follow Leave No Trace principles to minimize your footprint while enjoying nature's splendor.</p>

<h3>Which global destinations best showcase nature's captivating beauty?</h3>
<p>Iconic spots like New Zealand's fjords, Iceland's geothermal landscapes, and Japan's cherry blossom forests highlight diverse natural beauty. For accessibility, consider U.S. national parks like Yellowstone for geysers and wildlife. Plan visits during off-peak seasons to avoid crowds and support conservation through park fees.</p>
<h3>Can urban dwellers still appreciate beauty in nature daily?</h3>
<p>Yes, urban dwellers can find nature's beauty in rooftop gardens, community green spaces, or even stargazing in city parks. Initiatives like urban forestry projects in cities such as Singapore provide accessible oases. Simple practices, like window gardening or weekend escapes to nearby reserves, bridge the gap effectively.</p>`);
  const [editorContent, setEditorContent] = useState("");
  const [apiError, setApiError] = useState(null);
  const [showHeadingPopup, setShowHeadingPopup] = useState(false);
  const [blogHeadings, setBlogHeadings] = useState([]);
  const [finalHeadings, setFinalHeadings] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [blogOptions, setBlogOptions] = useState({
    blogTopic: "",
    blogLength: "",
    writingStyle: "informative",
    seoKeywords: "",
    numberOfHeadings: "2",
    outputLanguage: "English",
  });
  const [errors, setErrors] = useState({});

  // Set up effect to update editor content when generated content changes

  const validateInputs = () => {
    const newErrors = {};
    if (!blogOptions.blogTopic.trim()) newErrors.blogTopic = true;
    if (!blogOptions.blogLength.trim()) newErrors.blogLength = true;
    if (!blogOptions.seoKeywords.trim()) newErrors.seoKeywords = true;
    if (!blogOptions.outputLanguage.trim()) newErrors.outputLanguage = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setApiError("Please fill in all required fields.");
      return false;
    }

    setApiError(null);
    return true;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setBlogOptions((prev) => ({
      ...prev,
      [id === 'blog-topic' ? 'blogTopic' :
        id === 'blog-length' ? 'blogLength' :
          id === 'writing-style' ? 'writingStyle' :
            id === 'seo-keywords' ? 'seoKeywords' :
              id === 'number-of-headings' ? 'numberOfHeadings' :
                id === 'output-language' ? 'outputLanguage' : id]: value
    }));

    if (errors[id === 'blog-topic' ? 'blogTopic' :
      id === 'blog-length' ? 'blogLength' :
        id === 'seo-keywords' ? 'seoKeywords' :
          id === 'output-language' ? 'outputLanguage' : id]) {
      setErrors((prev) => ({
        ...prev, [id === 'blog-topic' ? 'blogTopic' :
          id === 'blog-length' ? 'blogLength' :
            id === 'seo-keywords' ? 'seoKeywords' :
              id === 'output-language' ? 'outputLanguage' : id]: false
      }));
    }
  };

  const handleGenerateContent = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    setIsGenerating(true);
    try {
      // Call the blog generator API
      const response = await apiClient.ai.blogheadings({
        blogTopic: blogOptions.blogTopic,
        writingStyle: blogOptions.writingStyle,
        seoKeywords: blogOptions.seoKeywords,
        numberOfHeadings: blogOptions.numberOfHeadings,
        outputLanguage: blogOptions.outputLanguage,
      });

      setBlogHeadings(response.headings);
      setShowHeadingPopup(true);
    } catch (error) {
      console.error("Error generating content:", error);
      setApiError(
        error.message || "Failed to generate content. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(editorContent);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000); // Reset after 2 seconds
  };

  const handleSaveHeadings = (customizedHeadings) => {
    setFinalHeadings(customizedHeadings);
    setShowHeadingPopup(false);

    // Generate the blog content with the customized headings
    generateBlogWithHeadings(customizedHeadings);
  };

  const handleCancelHeadings = () => {
    setShowHeadingPopup(false);
    setBlogHeadings([]);
  };

  const generateBlogWithHeadings = async (headings) => {
    setIsGenerating(true);
    try {
      // Call the blog generator API with the customized headings
      const response = await apiClient.ai.blogGenerator({
        blogTopic: blogOptions.blogTopic,
        blogLength: blogOptions.blogLength,
        writingStyle: blogOptions.writingStyle,
        seoKeywords: blogOptions.seoKeywords,
        outputLanguage: blogOptions.outputLanguage,
        headings: headings, // Pass the customized headings
      });
      setGeneratedContent(response.blog);
    } catch (error) {
      console.log("Error generating blog content:", error);
      setApiError(
        error.message || "Failed to generate blog content. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (generatedContent) {
      setEditorContent(generatedContent);
    }
  }, [generatedContent]);
  return (
    <div className="space-y-6 text-white">
      {/* Blog Heading Popup */}
      <BlogHeadingPopup
        isOpen={showHeadingPopup}
        onClose={handleCancelHeadings}
        headings={blogHeadings}
        onSave={handleSaveHeadings}
        onCancel={handleCancelHeadings}
      />

      {/* Left Panel - Input Form */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-white">Blog Generation Settings</CardTitle>
            <CardDescription className="text-white">Configure your blog requirements</CardDescription>
          </CardHeader>
          <CardContent >
            <form className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="blog-topic" className="text-white">Blog Topic</Label>
                <Input
                  id="blog-topic"
                  placeholder="e.g., The Future of AI in Marketing"
                  value={blogOptions.blogTopic}
                  onChange={handleInputChange}
                  className={`text-white ${errors.blogTopic ? "border-red-500" : ""}`}
                />
                {errors.blogTopic && <p className="text-red-500 text-sm mt-1">This field is required</p>}
              </div>
              <div>
                <Label htmlFor="blog-length" className="text-white">Blog Length</Label>
                <select
                  id="blog-length"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md text-white bg-transparent"
                  value={blogOptions.blogLength}
                  onChange={(e) =>
                    setBlogOptions({ ...blogOptions, blogLength: e.target.value })
                  }
                  required
                >
                  <option hidden>Select length</option>
                  <option value="300-500">300-500 words</option>
                  <option value="500-1000">500-1000 words</option>
                  <option value="1000-1500">1000-1500 words</option>
                  <option value="1500-2500">1500-2500 words</option>
                  <option value="3000+">3000+ words</option>
                  <option value="4000+">4000+ words</option>
                  <option value="5000+">5000+ words</option>
                  <option value="7000+">7000+ words</option>
                  <option value="9000+">9000+ words</option>
                  <option value="12000+">12000+ words</option>
                </select>
              </div>
              <div>
                <Label htmlFor="number-of-headings" className="text-white">Number of headings</Label>
                <select
                  id="number-of-headings"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md text-white bg-transparent"
                  value={blogOptions.numberOfHeadings}
                  onChange={(e) =>
                    setBlogOptions({
                      ...blogOptions,
                      numberOfHeadings: e.target.value,
                    })
                  }
                  required
                >
                  <option value="4">4 headings</option>
                  <option value="5">5 headings</option>
                  <option value="6">6 headings</option>
                  <option value="7">7 headings</option>
                  <option value="8">8 headings</option>
                  <option value="9">9 headings</option>
                  <option value="10">10 headings</option>
                </select>
              </div>
              <div>
                <Label htmlFor="writing-style" className="text-white">Writing Style</Label>
                <select
                  id="writing-style"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md text-white bg-transparent"
                  value={blogOptions.writingStyle}
                  required
                  onChange={(e) =>
                    setBlogOptions({
                      ...blogOptions,
                      writingStyle: e.target.value,
                    })
                  }
                >
                  <option value="informative">Informative</option>
                  <option value="conversational">Conversational</option>
                  <option value="technical">Technical</option>
                  <option value="storytelling">Storytelling</option>
                </select>
              </div>
              <div>
                <Label htmlFor="seo-keywords" className="text-white">SEO Focus Keywords</Label>
                <Input
                  id="seo-keywords"
                  placeholder="e.g., marketing, AI, content creation"
                  value={blogOptions.seoKeywords}
                  onChange={handleInputChange}
                  className={`text-white ${errors.seoKeywords ? "border-red-500" : ""}`}
                />
                {errors.seoKeywords && <p className="text-red-500 text-sm mt-1">This field is required</p>}
              </div>
              <div>
                <Label htmlFor="output-language" className="text-white">Output Language</Label>
                <Input
                  id="output-language"
                  placeholder="e.g., Bangla, English, Spanish, French"
                  value={blogOptions.outputLanguage}
                  onChange={handleInputChange}
                  className={`text-white ${errors.outputLanguage ? "border-red-500" : ""}`}
                />
                {errors.outputLanguage && <p className="text-red-500 text-sm mt-1">This field is required</p>}
              </div>
              <div>
                <div className="flex gap-1 items-center">
                  <p className="text-xs text-white">✅</p>
                  <Label htmlFor="human-like" className="text-white">
                    FAQ (Frequently Asked Questions)
                  </Label>
                </div>
                <p className="text-sm text-white">
                  Add frequently asked questions (FAQs) to the blog.
                </p>
              </div>
              <div>
                <div className="flex gap-1 items-center">
                  <p className="text-xs text-white">✅</p>
                  <Label htmlFor="human-like" className="text-white">Human like content</Label>
                </div>
                <p className="text-sm text-white">
                  Generate content that is more human like.
                </p>
              </div>
              <div>
                <div className="flex gap-1 items-center">
                  <p className="text-xs text-white">✅</p>
                  <Label htmlFor="human-like" className="text-white">Image in the blog post</Label>
                </div>
                <p className="text-sm text-white">
                  Add pixabay images to the blog post.
                </p>
              </div>
              <div className="col-span-3 flex flex-col items-center">
                {apiError && (
                  <div className="text-red-500 text-sm mb-2">{apiError}</div>
                )}
                <Button
                  onClick={handleGenerateContent}
                  className="w-fit text-white"
                  disabled={isGenerating}
                  type="submit"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Blog
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Generated Content with Rich Text Editor */}
      <div className="space-y-6">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-white">Generated Blog</CardTitle>
            <CardDescription className="text-white">
              Edit your AI-generated blog content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(finalHeadings.length > 0 && !generatedContent) && (
              <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-400" />
                  Selected Blog Structure
                </h3>
                <div className="space-y-3">
                  {finalHeadings.map((heading, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{heading.title}</p>
                      </div>
                      {heading.imageLink && (
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-600">
                          <img
                            src={heading.imageLink}
                            alt={`Heading ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {generatedContent ? (
              <div className="space-y-4">
                <div className="bg-white/10 rounded-md min-h-[400px] whitespace-pre-wrap">
                  <TiptapEditor
                    content={editorContent}
                    onUpdate={({ editor }) => {
                      setEditorContent(editor.getHTML());
                    }}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button variant="glass" onClick={handleCopyContent} className="text-white">
                    <Copy className="mr-2 h-4 w-4" />
                    {isCopied ? "Copied ✔" : "Copy Blog"}
                </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] rounded-md p-6 text-center">
                <FileText className="h-12 w-12 text-white mb-4" />
                <p className="text-white mb-2">
                  Fill in the form and click Generate to create your blog post
                </p>
                <div className="flex flex-col gap-2 mt-4 w-full max-w-xs">
                  <div className="flex items-center gap-2">
                    <PenTool className="h-4 w-4 text-white" />
                    <p className="text-sm text-white">
                      SEO-optimized content
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart className="h-4 w-4 text-white" />
                    <p className="text-sm text-white">
                      Engaging and informative articles
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-white" />
                    <p className="text-sm text-white">
                      Tailored to your target audience
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <ContentPublisher
        content={editorContent}
        onPublished={() => {
          setGeneratedContent("");
          setEditorContent("");
          setBlogHeadings([]);
          setFinalHeadings([]);
          setBlogOptions({
            blogTopic: "",
            blogLength: "",
            writingStyle: "informative",
            seoKeywords: "",
            numberOfHeadings: "2",
            outputLanguage: "English",
          });
        }}
      />
    </div>
  );
}
