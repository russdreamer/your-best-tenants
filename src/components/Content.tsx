import { FC, ReactElement, useEffect, useRef } from 'react';
import profilePic from '../assets/img/0.jpg';
import p2 from '../assets/img/2.jpg';
import p3 from '../assets/img/3.jpg';
import p4 from '../assets/img/4.jpg';
import p5 from '../assets/img/5.jpg';
import p6 from '../assets/img/6.jpg';
import p7 from '../assets/img/7.jpg';
import p8 from '../assets/img/8.jpg';
import p9 from '../assets/img/9.jpg';
import p10 from '../assets/img/10.jpg';
import p11 from '../assets/img/11.jpg';
import p12 from '../assets/img/12.jpg';
import p13 from '../assets/img/13.jpg';
import p14 from '../assets/img/14.jpg';
import ContentCSS from './Content.module.css'
import { useLanguage } from '../context/LanguageContext';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFrontView } from '../context/FrontViewContext';
import { FrontViewHandlerType } from './FrontView';

 var frontViewRef:React.RefObject<FrontViewHandlerType>|undefined; 

export default () => {
    const {ref} = useFrontView();
    frontViewRef = ref;

    return(
        <>
        <div className={ContentCSS.content}>
            <FirstParagraph/>
            <SecondParagraph/>
            <Slider srcs={[p3, p14, p6]}/>
            <ThirdParagraph/>
            <Slider srcs={[p2, p5, p4, p7, p8]}/>
            <ForthParagraph/>
            <FifthParagraph/>
            <SixthParagraph/>
            <Slider srcs={[p10, p9, p11, p13, p12]}/>
        </div>
        </>
    );
}

const FirstParagraph = () => {
    const { t }  = useLanguage();
    const text = useRef<HTMLDivElement>(null);
    const image = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const updateTextMarginTopBasedOnHeight = () => {
          if (text.current && image.current) {
            const textHeight = text.current.offsetHeight;
            const imageHeight = image.current.offsetHeight;
            if (textHeight < imageHeight) {
                text.current.style.marginTop = imageHeight - textHeight + "px";
            } else if (text.current.style.marginTop != "0px"){
                text.current.style.marginTop = "0px";
            }
          }
        };

        updateTextMarginTopBasedOnHeight();
        window.addEventListener('resize', updateTextMarginTopBasedOnHeight);
        window.addEventListener('load', updateTextMarginTopBasedOnHeight);

        return () => {
          window.removeEventListener('resize', updateTextMarginTopBasedOnHeight);
          window.removeEventListener('load', updateTextMarginTopBasedOnHeight);
        };
      }, [text, image, t]);

    return(
        <div>
            <img ref={image} onClick={handleImageClick} className={ContentCSS.avatar} src={profilePic}/>
            <div ref={text} className={ContentCSS.paragraph}>
                {t.content.section1
                .replace("{{igor_age}}", calculateAge("1988-01-02"))
                .replace("{{mariia_age}}", calculateAge("1992-05-08"))}
            </div>
        </div>
    );
}

const SecondParagraph:FC = () => {
    const { t }  = useLanguage();
    return(
        <div className={ContentCSS.paragraph}>
            {t.content.section2}
        </div>
    );
}

const ThirdParagraph:FC = () => {
    const { t }  = useLanguage();
    return(
        <div className={ContentCSS.paragraph}>
            {t.content.section3
            .replace("{{experience_years}}", calculateAge("2012-10-01"))}
        </div>
    );
}

const ForthParagraph:FC = () => {
    const { t }  = useLanguage();
    return(
        <>
            <div className={ContentCSS.paragraph}>
                {t.content.section4.title}
            </div>
            <div className={ContentCSS.point}>
                {t.content.section4.point1}
            </div>
            <div className={ContentCSS.point}>
                {t.content.section4.point2}
            </div>
            <div className={ContentCSS.point}>
                {t.content.section4.point3}
            </div>
            <div className={ContentCSS.point}>
                {t.content.section4.point4}
            </div>
            <div className={ContentCSS.paragraph}/>
        </>
    );
}

const FifthParagraph:FC = () => {
    const { t }  = useLanguage();
    return(
        <div className={ContentCSS.paragraph}>
            {t.content.section5}
        </div>
    );
}

const SixthParagraph:FC = () => {
    const { t }  = useLanguage();
    return(
        <div className={ContentCSS.paragraph}>
            {t.content.section6}
        </div>
    );
}

const handleImageClick = (event:any) => {
    const target = event.target as HTMLImageElement;
    frontViewRef?.current?.show(<img className={ContentCSS['front-image']} src={target.src} />);
}

type SliderProps = {
    srcs: Array<string>
}

const Slider = ({srcs}:SliderProps) => {
    function getSliderItem(src: string): ReactElement {
        return (
            <Carousel.Item key={src} className={ContentCSS['carousel-item']}>
                <img onClick={handleImageClick} className={ContentCSS.picture} src={src}/>
            </Carousel.Item>
        );
    }

    return(
        <Carousel className={ContentCSS.slider}>
            {srcs.map(src => getSliderItem(src))}
        </Carousel>
    );
}

function calculateAge(birthday:string):string {
    let birthDate = new Date(birthday);
    
    let currentDate = new Date();
    
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    let currentDay = currentDate.getDate();
    
    let birthYear = birthDate.getFullYear();
    let birthMonth = birthDate.getMonth();
    let birthDay = birthDate.getDate();
    
    let age = currentYear - birthYear;
    
    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
        age--;
    }
    
    return age + "";
}