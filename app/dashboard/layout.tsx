'use client';

import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { navLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';

import { CircleUser } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    
      <section className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/60 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[68px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-extrabold">
                <Image
                  src="/assets/logo.png"
                  alt="PapDev"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <h2 className="text-2xl">
                  <span className="text-primary">PapDev</span> Blog
                </h2>
              </Link>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 font-semibold lg:px-4">
                {navLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      pathname === item.href
                        ? 'bg-muted text-primary'
                        : 'text-muted-foreground bg-none',
                      'flex items-center gap-3 rounded-lg px-3 transition-all hover:text-primary/80 py-4 mt-4'
                    )}
                  >
                    <item.icon size={20} />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-16 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[68px] lg:px-6">
            <div className="ml-auto flex items-center gap-x-5">
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="rounded-full">
                    <CircleUser className="h-6 w-6"/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start'>
                  <DropdownMenuItem asChild>
                    <LogoutLink>
                      Logout
                    </LogoutLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </section>
    
  );
};

export default Dashboardlayout;
