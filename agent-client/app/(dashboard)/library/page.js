"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
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

export default function LibraryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [filterType, setFilterType] = useState("all");

  // Mock data for demonstration
  useEffect(() => {
    // Simulate API call to fetch images
    setTimeout(() => {
      const mockImages = [
        {
          id: "1",
          url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop",
          title: "Self Model - Casual Outfit",
          type: "self-model",
          createdAt: "2023-06-15T10:30:00Z",
        },
        {
          id: "2",
          url: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&auto=format&fit=crop",
          title: "Self Model - Formal Wear",
          type: "self-model",
          createdAt: "2023-06-18T14:20:00Z",
        },
        {
          id: "3",
          url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop",
          title: "Poster Design - Summer Sale",
          type: "poster",
          createdAt: "2023-06-20T09:15:00Z",
        },
        {
          id: "4",
          url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&auto=format&fit=crop",
          title: "Self Model - Accessories",
          type: "self-model",
          createdAt: "2023-06-22T16:45:00Z",
        },
        {
          id: "5",
          url: "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=800&auto=format&fit=crop",
          title: "Poster Design - New Product",
          type: "poster",
          createdAt: "2023-06-25T11:30:00Z",
        },
        {
          id: "6",
          url: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop",
          title: "Self Model - Winter Collection",
          type: "self-model",
          createdAt: "2023-06-28T13:10:00Z",
        },
      ];
      setImages(mockImages);
      setLoading(false);
    }, 1500);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      setImages(images.filter((image) => image.id !== id));
      if (selectedImage && selectedImage.id === id) {
        setSelectedImage(null);
      }
    }
  };

  const handleDownload = (image) => {
    // Create a temporary link element to trigger the download
    const link = document.createElement("a");
    link.href = image.url;
    link.download = `${image.title.replace(/\s+/g, "-").toLowerCase()}.jpg`;
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
    const matchesSearch = image.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "all" || image.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Image Library</h1>
        <p className="text-white/80 mt-1">
          View, download, and manage your generated images
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search images..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterType === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange("all")}
          >
            All
          </Button>
          <Button
            variant={filterType === "self-model" ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange("self-model")}
          >
            Self Models
          </Button>
          <Button
            variant={filterType === "poster" ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange("poster")}
          >
            Posters
          </Button>
        </div>
      </div>

      {/* Image Gallery */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoaderAnim />
        </div>
      ) : filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <Card key={image.id} className="overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={image.url}
                  alt={image.title}
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
                <h3 className="font-medium text-sm truncate">{image.title}</h3>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-white/60">
                    {formatDate(image.createdAt)}
                  </span>
                  <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">
                    {image.type === "self-model" ? "Self Model" : "Poster"}
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
            {searchTerm || filterType !== "all"
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
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>
            <div className="p-4 bg-gray-800">
              <h2 className="text-xl font-semibold text-white mb-2">
                {selectedImage.title}
              </h2>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-white/70">
                    Created on {formatDate(selectedImage.createdAt)}
                  </p>
                  <span className="inline-block mt-1 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    {selectedImage.type === "self-model"
                      ? "Self Model"
                      : "Poster"}
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