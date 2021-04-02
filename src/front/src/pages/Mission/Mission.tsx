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
          src: '/caroussel1.jpg',
          altText: '',
          caption: 'Avez-vous envie de dépasser vos limites ?'
        },
        {
          src: '/caroussel2.jpeg',
         
          altText: 'french',
          caption: 'Avez-vous envie de bien s\'amuser avec vos collègues ?'
        },
        {
          src: '/caroussel3.jpg',
          altText: 'aaa',
          caption: 'Ou les 2 ? ... Pourquoi pas ! ;) '
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
              <CarouselCaption captionText={""} captionHeader={item.caption} />
            </CarouselItem>
          );
        });
      
        return (
          <>
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
        
        <div id="mission">
        Bienvenue chez Free-Sport-Camp!<br/><br/>

        Faire du sport est essentiel pour notre santé physique et mentale, pour se sentir bien au quotidien, 
        mais beaucoup de personnes ne trouvent pas la motivation de les pratiquer seul.<br/>

        Vous venez de découvrir une application gratuite, qui facilite la mise en relation entre collègues souhaitant pratiquer une activité sportive de n'importe quel niveau.

        Selon votre emploi du temps, pour matin, midi ou soir, vous pouvez

        chercher / proposer un activité pour s'amuser avec vos collègues à côté de votre bureau, organiser des compétitions "maison", ou aller plus loin et se préparer ensemble aux compétitions plus ambitieuses (comme le marathon, par exemple ;)
        seulement en quelque clics.<br/>

        Selon vos centres d’intérêts sportifs, vos objectifs et votre disponibilité, il devient plus facile !<br/>
        C’EST DONC L’APPLICATION IDÉALE POUR UN SPORTIF OCCASIONNEL, QUI A SOUVENT DU MAL À SE MOTIVER À BOUGER D SON FAUTEUIL. <br/><br/>

        Si vous avez des questions n'hésitez pas à me contacter notre administrateur : anna.cuilhe@yahoo.fr

        </div>
        </>

        );
      }
      
     



export default Mission;