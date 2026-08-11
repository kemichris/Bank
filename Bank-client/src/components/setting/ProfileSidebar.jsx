import { useState } from "react";
import toast from "react-hot-toast";
import {
  HiOutlineUser,
  HiOutlineKey,
  HiOutlineCreditCard,
} from "react-icons/hi2";

import { profileImgUpdate } from "../../services/settings.service";

export function ProfileSidebar({
  activeSection = "profile",
  onSectionChange,
  profile,
}) {
  const [profileImage, setProfileImage] = useState(
    profile?.profileImage || null,
  );

  const [uploadingImage, setUploadingImage] = useState(false);

  const menuItems = [
    {
      id: "profile",
      label: "Profile Information",
      icon: HiOutlineUser,
    },
    {
      id: "password",
      label: "Password Settings",
      icon: HiOutlineKey,
    },
    {
      id: "pin",
      label: "Transaction PIN",
      icon: HiOutlineCreditCard,
    },
  ];

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // -----------------------------------------
    // Validate file type
    // -----------------------------------------

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");

      event.target.value = "";

      return;
    }

    // -----------------------------------------
    // Validate file size
    // -----------------------------------------

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Profile image must be less than 5MB.");

      event.target.value = "";

      return;
    }

    // -----------------------------------------
    // Preview
    // -----------------------------------------

    const previewUrl = URL.createObjectURL(file);

    const previousImage = profileImage;

    setProfileImage(previewUrl);

    setUploadingImage(true);

    try {
      const formData = new FormData();

      formData.append("profileImage", file);

      const response = await profileImgUpdate(formData);

      // Use the actual Cloudinary URL
      setProfileImage(response.data.profileImage);

      toast.success("Profile image updated successfully.");
    } catch (error) {
      console.error(error);

      // Restore previous image
      setProfileImage(previousImage || null);

      toast.error(
        error.response?.data?.message || "Unable to update profile image.",
      );
    } finally {
      setUploadingImage(false);

      URL.revokeObjectURL(previewUrl);

      event.target.value = "";
    }
  };

  return (
    <div
      className="
                w-full
                overflow-hidden
                rounded-2xl
                border
                border-border
                bg-surface-2
            "
    >
      {/* Profile Header */}
      <div
        className="
                    flex
                    flex-col
                    items-center
                    bg-primary
                    px-6
                    py-7
                    text-center
                "
      >
        {/* Avatar */}
        <div className="relative">
          <div
            className="
            flex
            h-20
            w-20
            items-center
            justify-center
            overflow-hidden
            rounded-2xl
            border-2
            border-white/60
            bg-white/80
            text-2xl
            font-bold
            text-primary
        "
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="
                    h-full
                    w-full
                    object-cover
                "
              />
            ) : (
              "MA"
            )}
          </div>

          {/* Camera */}
          <label
            htmlFor="profile-image"
            className="
            absolute
            -bottom-1
            -right-1
            flex
            h-7
            w-7
            cursor-pointer
            items-center
            justify-center
            rounded-full
            border-2
            border-primary
            bg-surface-1
            text-text
            transition
            hover:bg-surface-2
        "
          >
            {uploadingImage ? (
              <span className="text-xs">...</span>
            ) : (
              <span className="text-xs">📷</span>
            )}
          </label>

          <input
            id="profile-image"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={handleImageChange}
            disabled={uploadingImage}
          />
        </div>

        <h2 className="mt-3 text-lg font-bold text-white">
          {`${profile.firstName} ${profile.lastName} `}
        </h2>

        <p className="mt-1 text-sm text-white/80">
          {profile.account.accountNumber}
        </p>
      </div>

      {/* Navigation */}
      <nav className="p-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSectionChange?.(item.id)}
              className={`
                                flex
                                w-full
                                items-center
                                gap-3
                                rounded-xl
                                px-4
                                py-3
                                text-left
                                text-sm
                                font-medium
                                transition
                                ${
                                  isActive
                                    ? "bg-primary/15 text-primary"
                                    : "text-text-muted hover:bg-surface-3 hover:text-text"
                                }
                            `}
            >
              <Icon size={19} />

              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
