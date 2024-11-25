import {useState, useEffect} from 'react';
import Candidate from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[] | null>(null);

  useEffect(() => {
    const storedCandidates = localStorage.getItem('candidates');
    if (storedCandidates) {
      setCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  return (
    <>
      <h1>Potential Candidates</h1>
      <div className='candidateRow field-name'>
        <div className='itemContainer'>
          <p className='tableItem'>Image</p>
        </div>
        <div className='itemContainer'>
          <p className='tableItem'>Name</p>
        </div>
        <div className='itemContainer'>
          <p className='tableItem'>Location</p>
        </div>
        <div className='itemContainer'>
          <p className='tableItem'>Email</p>
        </div>
        <div className='itemContainer'>
          <p className='tableItem'>Company</p>
        </div>
        <div className='itemContainer'>
          <p className='tableItem'>Bio</p>
        </div>
        <div className='itemContainer'>
          <p className='tableItem'>Reject</p>
        </div>
      </div>
      {candidates && candidates.map((candidate) => (
        <div key={candidate.login} className='candidateRow'>
          <div className='itemContainer'>
            <img className='tableItem candidateImg' src={candidate.avatar_url} alt="Avatar" />
          </div>
          <div className='itemContainer'>
            <p className='tableItem'>{candidate.name}({candidate.login})</p>
          </div>
          <div className='itemContainer'>
            <p className='tableItem'>{candidate.location}</p>
          </div>
          <div className='itemContainer'>
            <p className='tableItem'>{candidate.email}</p>
          </div>
          <div className='itemContainer'>
            <p className='tableItem'>{candidate.company}</p>
          </div>
          <div className='itemContainer'>
            <p className='tableItem'>{candidate.bio}</p>
          </div>
          <div className='itemContainer'>
            <button className='tableItem' onClick={() => {
                const newCandidates = candidates.filter((c) => c.login !== candidate.login);
                localStorage.setItem('candidates', JSON.stringify(newCandidates));
                setCandidates(newCandidates);
              }
            }>Reject</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default SavedCandidates;
