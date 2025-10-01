"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  X,
  Edit3,
  Check,
  XCircle,
  Image as ImageIcon,
  Sparkles,
  Save,
  RotateCcw,
} from "lucide-react";

const BlogHeadingPopup = ({
  isOpen,
  onClose,
  headings,
  onSave,
  onCancel
}) => {
  // Store the original headings in a ref so it doesn't trigger re-renders
  const originalHeadingsRef = useRef(null);
  const originalSelectedImagesRef = useRef({});

  const [editableHeadings, setEditableHeadings] = useState([]);
  const [selectedImages, setSelectedImages] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempTitle, setTempTitle] = useState("");

  useEffect(() => {
    if (headings && headings.length > 0) {
      // Store original headings in ref for reset functionality
      originalHeadingsRef.current = JSON.parse(JSON.stringify(headings));

      // Set the editable headings state
      setEditableHeadings(JSON.parse(JSON.stringify(headings)));

      // Initialize selected images with first image of each heading
      const initialSelectedImages = {};
      headings.forEach((heading, index) => {
        if (heading.images && heading.images.length > 0) {
          initialSelectedImages[index] = heading.images[0];
        }
      });

      // Store original selected images in ref for reset functionality
      originalSelectedImagesRef.current = { ...initialSelectedImages };
      setSelectedImages({ ...initialSelectedImages });
    }
  }, [headings]);

  const handleEditTitle = (index) => {
    setEditingIndex(index);
    setTempTitle(editableHeadings[index].title);
  };

  const handleSaveTitle = (index) => {
    const updatedHeadings = [...editableHeadings];
    updatedHeadings[index].title = tempTitle;
    setEditableHeadings(updatedHeadings);
    setEditingIndex(null);
    setTempTitle("");
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setTempTitle("");
  };

  const handleImageSelect = (headingIndex, imageUrl) => {
    setSelectedImages(prev => ({
      ...prev,
      [headingIndex]: imageUrl
    }));
  };

  const handleSave = () => {
    const finalHeadings = editableHeadings.map((heading, index) => ({
      title: heading.title,
      imageLink: selectedImages[index]
    }));
    onSave(finalHeadings);
  };

  const handleReset = () => {
    // Reset to original headings using the refs
    if (originalHeadingsRef.current) {
      setEditableHeadings(JSON.parse(JSON.stringify(originalHeadingsRef.current)));
      setSelectedImages(JSON.parse(JSON.stringify(originalSelectedImagesRef.current)));
      // Clear any editing state
      setEditingIndex(null);
      setTempTitle("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Sparkles className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Customize Your Blog Headings</h2>
              <p className="text-gray-400">Edit headings and select images for your blog post</p>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="space-y-6">
            {editableHeadings.map((heading, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <CardTitle className="text-white text-lg">
                        {editingIndex === index ? (
                          <div className="flex items-center gap-2">
                            <Input
                              value={tempTitle}
                              onChange={(e) => setTempTitle(e.target.value)}
                              className="bg-gray-700 border-gray-600 text-white text-2xl w-fit"
                              autoFocus
                            />
                            <Button
                              size="sm"
                              onClick={() => handleSaveTitle(index)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleCancelEdit}
                              className="border-red-600 text-red-400 hover:bg-red-600/20"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{heading.title}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditTitle(index)}
                              className="text-gray-400 hover:text-white hover:bg-gray-700"
                            >
                              <Edit3 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <ImageIcon className="h-4 w-4" />
                      <span className="text-sm">Select an image for this heading:</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {heading.images && heading.images.map((imageUrl, imageIndex) => (
                        <div
                          key={imageIndex}
                          className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedImages[index] === imageUrl
                            ? 'border-blue-500 ring-2 ring-blue-500/50'
                            : 'border-gray-600 hover:border-gray-500'
                            }`}
                          onClick={() => handleImageSelect(index, imageUrl)}
                        >
                          <div className="aspect-square relative">
                            <img
                              src={imageUrl}
                              alt={`Option ${imageIndex + 1}`}
                              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                              loading="lazy"
                            />
                            {selectedImages[index] === imageUrl && (
                              <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                  <Check className="h-5 w-5 text-white" />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {selectedImages[index] && (
                      <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center gap-2 text-green-400 text-sm">
                          <Check className="h-4 w-4" />
                          <span>Selected image for this heading</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between p-2 border-t border-gray-700 bg-gray-800/50">
          <div className="text-sm text-gray-400">
            {editableHeadings.length} heading{editableHeadings.length !== 1 ? 's' : ''} •
            {Object.keys(selectedImages).length} image{Object.keys(selectedImages).length !== 1 ? 's' : ''} selected
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="text-gray-300 border-gray-600 hover:bg-gray-700"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Save & Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeadingPopup;
