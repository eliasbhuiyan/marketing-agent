"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Download,
  Trash2,
  Search,
  Image as ImageIcon,
  X,
  Eye,
} from "lucide-react";
import LoaderAnim from "@/components/LoaderAnim";
import apiClient from "@/lib/api";
import Image from "next/image";
export default function LibraryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filterType, setFilterType] = useState("all");

  // Fetch images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await apiClient.library.getLibraryImages();
        setImages(response.images);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);
 
  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        setLoading(true);
        await api.ai.deleteLibraryImage(id);
        setImages(images.filter((image) => image.id !== id));
        if (selectedImage && selectedImage.id === id) {
          setSelectedImage(null);
        }
      } catch (error) {
        console.error("Failed to delete image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDownload = (image) => {
    // Create a temporary link element to trigger the download
    const link = document.createElement("a");
    link.href = image.image;
    link.target = "_blank";
    link.download = `${image.type.replace(/\s+/g, "-").toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openImageView = (image) => {
    setSelectedImage(image);
  };

  const closeImageView = () => {
    setSelectedImage(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredImages = images.filter((image) => {
    const matchesFilter = filterType === "all" || image.type === filterType;
    return matchesFilter;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white">Image Library</h1>
          <p className="text-white/80 mt-1">
            View, download, and manage your generated images
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2">
            <Button
              variant={filterType === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("all")}
            >
              All
            </Button>
            <Button
              variant={filterType === "poster_design" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("poster_design")}
            >
              Poster Design
            </Button>
            <Button
              variant={filterType === "intelligent_posters" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("intelligent_posters")}
            >
              Intelligent Posters
            </Button>
            <Button
              variant={filterType === "virtual_try-on" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("virtual_try-on")}
            >
              Virtual try-on
            </Button>
            <Button
              variant={filterType === "thumbnail_generator" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("thumbnail_generator")}
            >
              Thumbnails
            </Button>
          </div>
        </div>
      </div>
      {/* Image Gallery */}
      {loading ? (
        <div className="grid grid-cols-4 gap-10">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg animate-pulse">
                <div className="h-48 bg-gray-300"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <Card key={image._id} className="overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={image.image}
                  alt={image.type}
                  width={500}
                  height={300}
                  blurDataURL={image.image}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="mx-1"
                    onClick={() => openImageView(image)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="mx-1"
                    onClick={() => handleDownload(image)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="mx-1"
                    onClick={() => handleDelete(image.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-white/60">
                    {formatDate(image.createdAt)}
                  </span>
                  <span className="text-xs capitalize bg-white/10 px-2 py-0.5 rounded-full">
                    {image.type.split("_").join(" ")}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No images found
          </h3>
          <p className="text-white/70">
            {filterType !== "all"
              ? "Try adjusting your search or filters"
              : "Your library is empty. Generate some images to see them here."}
          </p>
        </div>
      )}

      {/* Image Viewer Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-gray-900 rounded-lg overflow-hidden">
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-black bg-opacity-50 border-0 text-white hover:bg-black hover:bg-opacity-70"
                onClick={closeImageView}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-2">
              <Image
                src={selectedImage.image}
                alt={selectedImage.type}
                className="w-full h-auto max-h-[80vh] object-contain"
                fill={true}
              />
            </div>
            <div className="p-4 bg-gray-800">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-white/70">
                    Created on {formatDate(selectedImage.createdAt)}
                  </p>
                  <span className="inline-block capitalize mt-1 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    {selectedImage.type.split("_").join(" ")}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(selectedImage)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      handleDelete(selectedImage.id);
                      closeImageView();
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
