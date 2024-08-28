import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Logo from '@/public/assets/logo.png';
import { ThemeToggle } from './ThemeToggle';
import {
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import { Button } from './ui/button';

const Hero = () => {
  return (
    <>
      <div className="relative flex flex-col w-full py-5 mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex flex-row items-center justify-between text-md lg:justify-start">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={Logo}
              alt="logo"
              className="size-10"
              width={40}
              height={40}
            />
            <h2 className="text-3xl font-bold">
              <span className="text-primary">PapDev</span> Blog
            </h2>
          </Link>
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>
        <nav className="hidden md:flex md:justify-end md:space-x-4">
          <ThemeToggle />
          <LoginLink>
            <Button>Sign In</Button>
          </LoginLink>
          <RegisterLink>
            <Button variant="secondary">Sign Up</Button>
          </RegisterLink>
        </nav>
      </div>
      <section className="relative items-center justify-center flex">
        <div className="relative items-center w-full py-12 lg:py-20">
          <div className="text-center">
            <span className="text-lg text-primary font-medium bg-primary/10 px-4 py-2 rounded-full">Ultimate Blogging SaaS for Startups</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
