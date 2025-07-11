import ForgotPassword from '@/components/auth/ForgotPassword';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Next.js SignUp Page | TailAdmin - Next.js Dashboard Template',
  description: 'This is Next.js SignUp Page TailAdmin Dashboard Template',
  // other metadata
};

export default function forgetPassword() {
  return <ForgotPassword />;
}
