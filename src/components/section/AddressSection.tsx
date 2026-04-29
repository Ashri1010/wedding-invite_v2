"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import Address from "./Address";
import Image from "next/image";
import Navigations from "./Navigations";
import RollingBanner from "../RollingBanner";
import SlideUp from "../SlideUp";
import Spacing from "../Spacing";
import Text from "../Text";
import Title from "./Title";
import useIsInView from "@/hooks/useIsInView";

const TITLE = ["VILLA", "DE", "G", "CHEONGDAM"];
const AddressSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [transitionIds, setTransitionIds] = useState<number[]>([]);

  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const handleTransition = useCallback(() => {
    setTimeout(() => {
      setTransitionIds((prev) => (prev.length === 0 ? [0, 1, 2, 3] : prev));
    }, 0);

    setTimeout(() => {
      intervalId.current = setInterval(() => {
        setTransitionIds((prev) => {
          if (prev.length === TITLE.length + 3) {
            clearInterval(intervalId.current!);
            return prev;
          }
          return prev.concat(prev.length);
        });
      }, 200);
    }, 1000);

    setTimeout(() => {
      setTransitionIds((prev) => prev.concat(prev.length));
    }, 2000);

    setTimeout(() => {
      setTransitionIds((prev) =>
        prev.concat([prev.length, prev.length + 1, prev.length + 2])
      );
    }, 2200);
  }, []);

  useIsInView(ref, handleTransition);

  useEffect(() => {
    if (transitionIds.length > TITLE.length + 6) {
      clearInterval(intervalId.current!);
      intervalId.current = null;
    }
  }, [transitionIds]);

  return (
    <>
      <section ref={ref} id="address-section" className="w-full px-24pxr">
        {TITLE.map((title, index) => (
          <SlideUp key={index} show={transitionIds.includes(index)}>
            <Title>{title}</Title>
          </SlideUp>
        ))}
        <Spacing size={10} />
        <SlideUp show={transitionIds.includes(TITLE.length)}>
          <Address
            title="빌라드지디 청담"
            desc={`서울 강남구 학동로 519`}
          />
        </SlideUp>
        <Spacing size={20} />
        <SlideUp show={transitionIds.includes(TITLE.length + 1)}>
          <Address
            title="자가용 이용 시"
            desc="건물 내 주차 가능"
          />
        </SlideUp>
        <Spacing size={20} />
        <SlideUp show={transitionIds.includes(TITLE.length + 2)}>
          <Address
            title="지하철 이용 시"
            desc="7호선 청담역 13번 출구 도보 5분\n2호선 강남구청역 1번 출구 도보 10분"
          />
        </SlideUp>
        <Spacing size={20} />
        <SlideUp show={transitionIds.includes(TITLE.length + 3)}>
          <Text
            display="block"
            className="w-full p-10pxr text-12pxr leading-22pxr bg-[#F4F4F4] text-[#474747]"
          >
            오시는 길이 다소 복잡하실 수 있습니다. 청담동의 고즈넉한 분위기 속에서 저희의 소중한 날을 함께해 주시면 감사하겠습니다.♡
          </Text>
        </SlideUp>
        <Spacing size={20} />
        <SlideUp id="map" show={transitionIds.includes(TITLE.length + 4)}>
          <Image
            quality={100}
            src={"/map.png"}
            alt="map"
            width={382}
            height={245}
            className="w-full"
          />
        </SlideUp>

        <Spacing size={20} />
        <SlideUp id="" show={transitionIds.includes(TITLE.length + 5)}>
          <Navigations />
        </SlideUp>
      </section>

      <SlideUp show={transitionIds.includes(TITLE.length + 6)}>
        <Spacing size={80} />
        <RollingBanner />
      </SlideUp>
    </>
  );
};

export default AddressSection;
