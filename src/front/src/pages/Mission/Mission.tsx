import React, { useState } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
  } from 'reactstrap';
      
      const items = [
        {
          src: 'https://d19m59y37dris4.cloudfront.net/sell/1-4/img/united-kingdom.svg',
          altText: 'english',
          caption: 'Slide 1'
        },
        {
          src: 'https://d19m59y37dris4.cloudfront.net/sell/1-4/img/france.svg',
          altText: 'french',
          caption: 'Slide 2'
        },
        {
          src: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tousvoisins.fr%2Fdecines-charpieu%2Fgymnase-stade&psig=AOvVaw2DSiS5dKRFdEcu3loqSSbM&ust=1605907937881000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLCBkrXHj-0CFQAAAAAdAAAAABAJ',
          altText: 'Slide 3',
          caption: 'Slide 3'
        }
      ];
      
      const Mission = (props: any) => {
        const [activeIndex, setActiveIndex] = useState(0);
        const [animating, setAnimating] = useState(false);
      
        const next = () => {
          if (animating) return;
          const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
          setActiveIndex(nextIndex);
        }
      
        const previous = () => {
          if (animating) return;
          const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
          setActiveIndex(nextIndex);
        }
      
        const goToIndex = (newIndex: any) => {
          if (animating) return;
          setActiveIndex(newIndex);
        }
      
        const slides = items.map((item) => {
          return (
            <CarouselItem
              onExiting={() => setAnimating(true)}
              onExited={() => setAnimating(false)}
              key={item.src}
            >
              <img src={item.src} alt={item.altText} />
              <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
          );
        });
      
        return (
          <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
          >
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
          </Carousel>
        );
      }
      
     



export default Mission;