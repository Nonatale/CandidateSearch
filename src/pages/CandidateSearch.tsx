import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';
import GithubUserCard from '../components/GithubUserCard';

const getUserData = async () => {
  const userLogin = await searchGithub();
  const userData = await Promise.all(
    userLogin.map(async (user: any) => {
    const data = await searchGithubUser(user.login) as Candidate;
    return data;
    })
  );
  // Filter out empty objects
  const validData = userData.filter((data) => !isEmpty(data));
  return validData;
};

const CandidateSearch = () => {
  const [userData, setUserData] = useState<Candidate[] | null>(null);
  const [userIndex, setUserIndex] = useState<number | null>(null);
  const [currCandidate, setCurrCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      setUserData(data);
      setUserIndex(data.length - 1);
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData && userIndex !== null) {
      setCurrCandidate(userData[userIndex]);
    }
  }, [userData, userIndex]);

  const handleNextCandidate = () => {
    if (userIndex !== null && userIndex > 0) {
      setUserIndex(userIndex - 1);
    } else {
      setUserIndex(null); // No more candidates
    }
  };

  const handleSaveCandidate = () => {
    if (currCandidate) {
      const storedCandidates = localStorage.getItem('candidates');
      if (storedCandidates) {
        const candidates = JSON.parse(storedCandidates) as Candidate[];
        candidates.push(currCandidate);
        localStorage.setItem('candidates', JSON.stringify(candidates));
      } else {
        localStorage.setItem('candidates', JSON.stringify([currCandidate]));
      }
      handleNextCandidate();
    }
  }

  return (
    <div className='search-box'>
      <h1>Candidate Search</h1>
      {currCandidate ? (
        <GithubUserCard candidateData={currCandidate} />
      ) : (
        <p>No more candidates</p>
      )}
      <div className='button-container'>
        <button className='button next' onClick={handleNextCandidate}>Next Candidate</button>
        <button className='button save' onClick={handleSaveCandidate}>Save Candidate</button>
      </div>
    </div>
  );
};

const isEmpty = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};


export default CandidateSearch;
