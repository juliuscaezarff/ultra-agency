'use client'

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import styles from './style.module.scss';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const lenis = useRef(new Lenis());
  const servicesRef = useRef([]);

  useEffect(() => {
    lenis.current.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.current.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const services = servicesRef.current;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const service = entry.target;
          const imgContainer = service.querySelector(`.${styles.img}`);

          ScrollTrigger.create({
            trigger: service,
            start: 'bottom bottom',
            end: 'top top',
            scrub: true,
            onUpdate: (self) => {
              let progress = self.progress;
              let newWidth = 30 + 70 * progress;
              gsap.to(imgContainer, {
                width: newWidth + '%',
                duration: 0.1,
                ease: 'none',
              });
            },
          });

          ScrollTrigger.create({
            trigger: service,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            onUpdate: (self) => {
              let progress = self.progress;
              let newHeight = 150 + 300 * progress;
              gsap.to(service, {
                height: newHeight + 'px',
                duration: 0.1,
                ease: 'none',
              });
            },
          });

          observer.unobserve(service);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    services.forEach((service) => {
      observer.observe(service);
    });

    return () => {
      observer.disconnect();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.ticker.remove(lenis.current.raf);
    };
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.hero}></section>
      <section className={styles.services}>
        <div className={styles.servicesHeader}>
          <div className={styles.col}></div>
          <div className={styles.col}>
            <h1 className={styles.title}>All Services</h1>
          </div>
        </div>

        {[
          { title: 'Custom Web Development', desc: 'We provide bespoke web development solutions tailored to your business needs. Our team ensures top-notch performance and scalability.', img: '/images/image1.jpg' },
          { title: 'Mobile App Development', desc: 'Crafting intuitive and engaging mobile applications for both Android and iOS platforms. Enhance your user experience with our expert team.', img: '/images/image2.jpg' },
          { title: 'Digital Marketing', desc: 'Comprehensive digital marketing services to boost your online presence. From SEO to social media campaigns, we cover it all.', img: '/images/image3.jpg' },
          { title: 'Cloud Solutions', desc: 'Reliable and secure cloud solutions to streamline your business operations. Leverage the power of the cloud with our expertise.', img: '/images/image4.jpg' },
          { title: 'IT Consultancy', desc: 'Expert IT consultancy services to guide your business through digital transformation. Optimize your IT infrastructure with our insights.', img: '/images/image5.jpg' }
        ].map((service, index) => (
          <div className={styles.service} key={index} ref={el => servicesRef.current[index] = el}>
            <div className={styles.serviceInfo}>
              <h1 className={styles.title}>{service.title}</h1>
              <p className={styles.desc}>{service.desc}</p>
            </div>
            <div className={styles.serviceImg}>
              <div className={styles.img}>
                <Image src={service.img} alt={service.title} width={900} height={900} objectFit='cover' className='w-full h-full object-center'/>
              </div>
            </div>
          </div>
        ))}
      </section>
      <section className={styles.footer}></section>
    </div>
  );
};

export default Hero;
