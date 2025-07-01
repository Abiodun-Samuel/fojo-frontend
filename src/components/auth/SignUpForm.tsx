'use client';
import { EyeCloseIcon, EyeIcon } from '@/icons';
import Link from 'next/link';
import React, { useState } from 'react';
import InputForm from '../form/InputForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterFormSchema } from '@/validation/schema';
import { useRegisterUserMutation } from '@/store/auth/auth.api';
import useToastify from '@/hooks/useToastify';
import { useRouter } from 'next/navigation';
import { AppleIcon, GoogleIcon, FacebookIcon } from "@/assets/icons"
import Label from '../form/Label';
import { setTokenCookie } from '@/utils/helper';

type RegisterFormInputs = {
  full_name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { showToast } = useToastify();
  const router = useRouter();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = async (formData: RegisterFormInputs) => {
    try {
      const apiData = {
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      };
      const response = await registerUser(apiData).unwrap();
      setTokenCookie(response?.data?.token)
      showToast(response.message, 'success');
      router.replace('/verify-email');
    } catch (error: any) {
      if (error?.data?.errors) {
        Object.entries(error.data.errors).forEach(([field, messages]) =>
          setError(field as "full_name" | "email" | "password" | "password_confirmation", {
            type: 'server',
            message: Array.isArray(messages) ? messages[0] : messages,
          })
        );
      }
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:mx-18 my-[40px] shadow-[1px_4px_40px_0px_#0000000D] rounded-[20px] px-2 md:px-8 py-10  w-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col font-lora justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-black text-title-sm sm:text-title-md">
              Join the FOJO Community.
            </h1>
            <p className="text-sm text-gray-500 ">
              Start your discipleship journey.
            </p>
          </div>
          <div>
            <div className="grid grid-cols-3 gap-3  sm:gap-5">
              <button className="flex items-center justify-center border-[#E4E7EC] border-[1px] rounded-lg  py-[18px] text-sm font-normal transition-colors ">
                <GoogleIcon />
              </button>
              <button className="flex items-center justify-center border-[#E4E7EC] border-[1px] rounded-lg  py-[18px] text-sm font-normal transition-colors ">
                <AppleIcon />
              </button>
              <button className="flex items-center justify-center border-[#E4E7EC] border-[1px] rounded-lg  py-[18px] text-sm font-normal transition-colors ">
                <FacebookIcon />
              </button>
            </div>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                  OR
                </span>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-md space-y-6"
            >
              <div className="grid grid-cols-1 gap-3 ">
                {/* <!-- First Name --> */}
                <div className="sm:col-span-1">
                  <Label className="font-medium  text-gray-500">
                    Full Name
                  </Label>
                  <InputForm
                    name="full_name"
                    placeholder="Enter your full name"
                    register={register}
                    error={errors.full_name}
                    type="text"
                  />
                </div>

                {/* <!-- Email --> */}
                <div className="sm:col-span-1">
                  <Label className="font-medium  text-gray-500">
                    Email Address{' '}
                  </Label>
                  <InputForm
                    name="email"
                    placeholder="Enter your email address"
                    register={register}
                    error={errors.email}
                    type="text"
                  />
                </div>
                {/* <!-- Password --> */}
                <div>
                  <Label className="font-medium  text-gray-500">Password</Label>
                  <div className="relative ">
                    <InputForm
                      name="password"
                      placeholder="Enter password"
                      register={register}
                      error={errors.password}
                      type={showPassword ? 'text' : 'password'}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-7"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                {/* <!--Confirm Password --> */}
                <div>
                  <Label className="font-medium  text-gray-500">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <InputForm
                      name="password_confirmation"
                      placeholder="Confirm password"
                      register={register}
                      error={errors.password_confirmation}
                      type={showPassword ? 'text' : 'password'}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-7"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                {/* <!-- Button --> */}
                <div>
                  <button
                    type="submit"
                    className="flex mt-6 items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-black shadow-theme-xs  disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {isLoading ? <span className="loader mr-2"></span> : null}
                    Sign Up
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5 flex items-center justify-center">
              <p className="text-sm font-normal text-center text-gray-500 dark:text-gray-400 ">
                Already have an account?
                <Link
                  href="/signin"
                  className="text-black hover:underline font-bold"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
