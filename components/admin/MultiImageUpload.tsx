"use client";

import { useState, useEffect, useRef } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/contexts/ToastContext";

interface ImagePreview {
  id: string;
  url: string;
  isObjectURL: boolean; // Track if URL needs cleanup
}

interface MultiImageUploadProps {
  files?: (File | string)[];
  onChange: (files: (File | string)[]) => void;
  maxImages?: number;
}

export default function MultiImageUpload({
  files = [],
  onChange,
  maxImages = 4,
}: MultiImageUploadProps) {
  const toast = useToast();
  const [previews, setPreviews] = useState<ImagePreview[]>([]);
  const objectUrlsRef = useRef<string[]>([]);

  // Sync previews with files prop
  useEffect(() => {
    // Clean up old object URLs
    objectUrlsRef.current.forEach((url) => {
      URL.revokeObjectURL(url);
    });
    objectUrlsRef.current = [];

    // Generate new previews
    const newPreviews: ImagePreview[] = files.map((file, index) => {
      if (typeof file === "string") {
        // Existing URL
        return {
          id: `url-${index}-${file}`,
          url: file,
          isObjectURL: false,
        };
      } else {
        // File object - create object URL
        const objectUrl = URL.createObjectURL(file);
        objectUrlsRef.current.push(objectUrl);
        return {
          id: `file-${index}-${file.name}-${file.size}`,
          url: objectUrl,
          isObjectURL: true,
        };
      }
    });

    setPreviews(newPreviews);
  }, [files]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    const remainingSlots = maxImages - files.length;
    const filesToAdd = selectedFiles.slice(0, remainingSlots);

    if (filesToAdd.length === 0) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    // Validate files
    for (const file of filesToAdd) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select only image files");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Each file must be less than 10MB");
        return;
      }
    }

    onChange([...files, ...filesToAdd]);
    toast.success(`${filesToAdd.length} image(s) added`);

    // Reset input
    e.target.value = "";
  };

  const handleRemove = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onChange(newFiles);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {previews.map((preview, index) => (
          <div
            key={preview.id}
            className="relative w-full h-48 border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50"
          >
            <Image
              src={preview.url}
              alt={`Product image ${index + 1}`}
              fill
              className="object-cover"
              unoptimized
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
              Image #{index + 1}
            </div>
          </div>
        ))}

        {previews.length < maxImages && (
          <label className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2 bg-gray-50">
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="text-sm text-gray-500 font-medium">Add image</span>
            <span className="text-xs text-gray-400">
              {previews.length}/{maxImages} images
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      {previews.length === 0 && (
        <p className="text-sm text-gray-500 text-center">
          Upload up to {maxImages} product images. Images will be uploaded when
          you save the product.
        </p>
      )}
    </div>
  );
}
