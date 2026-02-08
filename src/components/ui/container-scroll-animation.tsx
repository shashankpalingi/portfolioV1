"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
    titleComponent,
    children,
}: {
    titleComponent: string | React.ReactNode;
    children: React.ReactNode;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
    });
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    const scaleDimensions = () => {
        return isMobile ? [0.7, 0.9] : [1.05, 1];
    };

    const rotate = useTransform(scrollYProgress, [0, 1], [0, 0]); // Neutralized for base, will add rotateX
    const rotateX = useTransform(scrollYProgress, [0, 1], [20, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
    const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <div
            className="flex items-center justify-center relative p-2 md:p-8"
            ref={containerRef}
        >
            <div
                className="py-10 md:py-20 w-full relative"
                style={{
                    perspective: "1000px",
                }}
            >
                <Header translate={translate} titleComponent={titleComponent} />
                <Card rotate={rotateX} translate={translate} scale={scale}>
                    {children}
                </Card>
            </div>
        </div>
    );
};

export const Header = ({ translate, titleComponent }: any) => {
    return (
        <motion.div
            style={{
                translateY: translate,
            }}
            className="div max-w-5xl mx-auto text-center"
        >
            {titleComponent}
        </motion.div>
    );
};

export const Card = ({
    rotate,
    scale,
    children,
}: {
    rotate: MotionValue<number>;
    scale: MotionValue<number>;
    translate: MotionValue<number>;
    children: React.ReactNode;
}) => {
    return (
        <motion.div
            style={{
                rotateX: rotate,
                scale,
                boxShadow:
                    "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
            }}
            className="max-w-3xl -mt-12 mx-auto h-[35rem] md:h-[45rem] w-full border-4 border-[#F2E3CF] p-2 md:p-6 bg-[#E35341] rounded-[30px] shadow-2xl relative overflow-hidden"
        >
            <div className=" h-full w-full overflow-hidden rounded-2xl bg-[#F2E3CF] dark:bg-zinc-900 md:rounded-2xl md:p-4 relative">
                {/* Notebook Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(#E35342 1px, transparent 1px), linear-gradient(90deg, #E35342 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />
                {/* Notebook Red Line */}
                <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#E35342] z-20 md:left-2" />

                <div className="relative z-10 h-full w-full">
                    {children}
                </div>
            </div>
        </motion.div>
    );
};
