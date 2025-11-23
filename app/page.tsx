"use client"
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Si se usan animaciones de scroll
import LandingPage from '@/components/landingPage/LandingPage';

// Registrar ScrollTrigger si es necesario
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
  

export default function Home() {
  const animationRef = useRef(null);

  useEffect(() => {
    // Asegúrate de que el elemento exista antes de intentar animarlo
    if (animationRef.current) {
      const tl = gsap.timeline({ paused: true });

      tl.to(animationRef.current, {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: 'power3.out',
      });

      tl.play(); // Inicia la animación
    }
  }, []);

  return (
    <>
      <LandingPage/>
    </>
     
  );
}

