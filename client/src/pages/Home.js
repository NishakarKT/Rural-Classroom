import React from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useState } from 'react';
import image1 from '../images/book/book-1.jpeg'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import image2 from '../images/book/book-2.jpeg'
import image3 from '../images/book/book-3.jpeg';
import image4 from '../images/book/book-4.jpeg';
import image5 from '../images/book/book-5.jpeg';
import image6 from '../images/book/book-6.jpeg';
import test1 from '../images/courses/Test1.webp';
import test2 from '../images/courses/test2.jpeg';
import test3 from '../images/courses/test3.webp';


const videos = [
  {
    url: 'https://www.example.com/video1.mp4',
    title: 'Video 1',
    description: 'This is the first video description.',
  },
  {
    url: 'https://www.example.com/video2.mp4',
    title: 'Video 2',
    description: 'This is the second video description.',
  },
  {
    url: 'https://www.example.com/video3.mp4',
    title: 'Video 3',
    description: 'This is the third video description.',
  },
  {
    url: 'https://www.example.com/video4.mp4',
    title: 'Video 4',
    description: 'This is the fourth video description.',
  },
  {
    url: 'https://www.example.com/video4.mp4',
    title: 'Video 5',
    description: 'This is the fourth video description.',
  },
  {
    url: 'https://www.example.com/video4.mp4',
    title: 'Video 6',
    description: 'This is the fourth video description.',
  },
  {
    url: 'https://www.example.com/video4.mp4',
    title: 'Video 7',
    description: 'This is the fourth video description.',
  },
  {
    url: 'https://www.example.com/video4.mp4',
    title: 'Video 8',
    description: 'This is the fourth video description.',
  },
  
];
const books = [
  {
    imageUrl: image1,
    title: 'Book 1',
   
  },
  {
    imageUrl: image2,
    title: 'Book 2',
   
  },
  {
    imageUrl: image3,
    title: 'Book 3',
    
  },
  {
    imageUrl: image4,
    title: 'Book 4',
   
  },
  {
    imageUrl: image5,
    title: 'Book 5',
    
  },
  {
    imageUrl: image6,
    title: 'Book 6',
    
  },
  {
    imageUrl: image1,
    title: 'Book 7',
    
  },
  {
    imageUrl: image3,
    title: 'Book 8',
   
  },
];
const tests = [
  {
    imageUrl: test1,
    title: 'Test 1',
    
  },
  {
    imageUrl: test2,
    title: 'Test 2',
    
  },
  {
    imageUrl: test3,
    title: 'Test 3',
    
  },
  {
    imageUrl: test2,
    title: 'Test 4',
    
  },
  {
    imageUrl: test1,
    title: 'Test 5',
    
  },
  {
    imageUrl: test3,
    title: 'Test 6',
    
  },
  {
    imageUrl: test1,
    title: 'Test 7',
    
  },
  {
    imageUrl: test2,
    title: 'Test 8',
    
  },
];


const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    // Function to navigate to the previous set of videos
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };
  const SampleNextArrow = ({ onClick }) => (
    <div className="next-icon" onClick={onClick}>
      {/* <AiOutlineRight /> */}
    </div>
  );
  const handleNextSlide = () => {
    const totalSets = Math.ceil(videos.length / settings.slidesToShow);

    if (currentSlide < totalSets - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const startIndex = currentSlide * 4;
  const endIndex = startIndex + 4;
 
  const SamplePrevArrow = ({ onClick }) => (
    <div className="prev-icon" onClick={onClick}>
      {/* <AiOutlineLeft /> */}
    </div>
  );


  const [currentSlide_book, setCurrentSlide_book] = useState(0);

  const handlePrevSlide_book = () => {
    // Function to navigate to the previous set of videos
    if (currentSlide_book > 0) {
      setCurrentSlide_book(currentSlide_book - 1);
    }
  };
  const SampleNextArrow_book = ({ onClick }) => (
    <div className="next-icon" onClick={onClick}>
      <AiOutlineRight />
    </div>
  );
  const handleNextSlide_book = () => {
    const totalSets = Math.ceil(books.length / settings1.slidesToShow);

    if (currentSlide_book < totalSets - 1) {
      setCurrentSlide_book(currentSlide_book + 1);
    }
  };

  const startIndex_book = currentSlide_book * 4;
  const endIndex_book = startIndex_book + 4;
 
  const SamplePrevArrow_book = ({ onClick }) => (
    <div className="prev-icon" onClick={onClick}>
      <AiOutlineLeft />
    </div>
  );



  const [currentSlide_test, setCurrentSlide_test] = useState(0);

  const handlePrevSlide_test = () => {
    // Function to navigate to the previous set of videos
    if (currentSlide_test > 0) {
      setCurrentSlide_test(currentSlide_test - 1);
    }
  };
  const SampleNextArrow_test = ({ onClick }) => (
    <div className="next-icon" onClick={onClick}>
      <AiOutlineRight />
    </div>
  );
  const handleNextSlide_test = () => {
    const totalSets = Math.ceil(tests.length / settings2.slidesToShow);

    if (currentSlide_test < totalSets - 1) {
      setCurrentSlide_test(currentSlide_test + 1);
    }
  };

  const startIndex_test = currentSlide_test * 4;
  const endIndex_test = startIndex_test + 4;
 
  const SamplePrevArrow_test = ({ onClick }) => (
    <div className="prev-icon" onClick={onClick}>
      <AiOutlineLeft />
    </div>
  );
  const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 4,  // Update to 4
      slidesToScroll: 4, // Update to 4
      prevArrow: <SamplePrevArrow />,
      nextArrow: <SampleNextArrow />,
      
  
  };

  const settings1 = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,  // Update to 4
    slidesToScroll: 4, // Update to 4
    prevArrow: <SamplePrevArrow_book />,
    nextArrow: <SampleNextArrow_book />,
  }
  const settings2 = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,  // Update to 4
    slidesToScroll: 4, // Update to 4
    prevArrow: <SamplePrevArrow_test />,
    nextArrow: <SampleNextArrow_test />,
  }

  return (
    <>
    
    <div className="video-page">
      <div className="slider-container">
         <h2>Upcoming Videos</h2>
        <div className="video-cards-container">
          {videos.slice(startIndex, endIndex).map((video, index) => (
            <div className="video-card" key={index}>
              <ReactPlayer url={video.url} width="100%" height="200px" controls />
              <h2>{video.title}</h2>
              <p>{video.description}</p>
            </div>
          ))}
        </div>
        <div className="navigation-buttons">
          <button onClick={handlePrevSlide}>Previous</button>
          <button onClick={handleNextSlide}>Next</button>
        </div>
        <br/>
        <h2>Books</h2>
        <div className="book-cards-container">
          {books.slice(startIndex_book, endIndex_book).map((book, index) => (

            <Link to="https://google.com">
                <Card sx={{ maxWidth: 220}} className="book-card">
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="230"
                      image={book.imageUrl}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" className="book-description">
                        <h2>{book.title}</h2>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
            </Link>
            
          ))}
        </div>

        <div className="navigation-buttons">
            <button onClick={handlePrevSlide_book}>Previous</button>
            <button onClick={handleNextSlide_book}>Next</button>
          </div>
          <br/>
        
          <h2>Tests</h2>
          <div className="test-cards-container">
          {tests.slice(startIndex_test, endIndex_test).map((test, index) => (

            <Link to="https://google.com">
                <Card sx={{ maxWidth: 220}} className="test-card">
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="230"
                      image={test.imageUrl}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" className="test-description">
                        <h2>{test.title}</h2>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
            </Link>
            
          ))}
        </div>
        <div className="navigation-buttons">
            <button onClick={handlePrevSlide_test}>Previous</button>
            <button onClick={handleNextSlide_test}>Next</button>
          </div>


      </div>
    </div>

    </>
  );
  
};

export default Home;
