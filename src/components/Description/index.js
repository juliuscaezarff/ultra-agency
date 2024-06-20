import { useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import styles from './style.module.css';

export default function Description() {
  const arrowRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(arrowRef.current, {
      rotate: -100,
      duration: 0.5,
      ease: 'power4.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(arrowRef.current, {
      rotate: 0,
      duration: 0.5,
      ease: 'power4.out',
    });
  };

  return (
    <section className="flex flex-col w-screen h-full p-[60px] max-w-full m-auto bg-black">
      <div className="mb-[4.16667vw]">
        <h5 className="text-[#969494] text-lg font-normal leading-[160%] whitespace-pre-line">
          BUILDING RELATIONSHIPS
        </h5>
      </div>
      <div className="w-[80.3472vw] mb-[5.55556vw]">
        <h1 className="text-[#d2cfcf] uppercase text-[5.5vw] font-normal leading-[100%]">
          BUT WE'RE HERE NOT TO TALK ABOUT OURSELVES - WE'RE HERE TO TALK ABOUT
          YOU, YOUR COMPANY, YOUR PRODUCT, AND YOUR GOALS.
        </h1>
      </div>
      <div
        className="flex items-center gap-8 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h1 className="text-[#d2cfcf] uppercase text-[5.5vw] font-normal leading-[100%]">
          LET'S TALK
        </h1>
        <div className={styles.arrowWrapper}>
          <Image
            ref={arrowRef}
            src={'/images/seta.svg'}
            alt="seta"
            width={10}
            height={10}
            className="w-[74px] h-[74px]"
          />
        </div>
      </div>
    </section>
  );
}
