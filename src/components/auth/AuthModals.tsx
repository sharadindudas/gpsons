"use client";

import { useState } from "react";
import LoginModal from "@/components/auth/LoginModal";
import SignupModal from "@/components/auth/SignupModal";
import VerifyOtpModal from "@/components/auth/VerifyOtpModal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { FaUserCircle } from "react-icons/fa";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthModals = ({ open, onOpenChange }: Props) => {
  const [currentModal, setCurrentModal] = useState<string>("login");

  const handleSignupSuccess = () => {
    setCurrentModal("verifyOtp");
  };

  const handleShowLogin = () => {
    setCurrentModal("login");
  };

  const handleCloseModal = () => {
    onOpenChange(false);
  };

  const handleShowSignup = () => {
    setCurrentModal("signup");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild className="cursor-pointer">
        <div>
          <FaUserCircle />
        </div>
      </DialogTrigger>

      {currentModal === "signup" && (
        <SignupModal
          onSignupSuccess={handleSignupSuccess}
          onShowLogin={handleShowLogin}
          onCloseModal={handleCloseModal}
        />
      )}

      {currentModal === "verifyOtp" && (
        <VerifyOtpModal
          onVerifyOtpSuccess={handleShowLogin}
          onCloseModal={handleCloseModal}
        />
      )}

      {currentModal === "login" && (
        <LoginModal
          onShowSignup={handleShowSignup}
          onCloseModal={handleCloseModal}
        />
      )}
    </Dialog>
  );
};

export default AuthModals;
