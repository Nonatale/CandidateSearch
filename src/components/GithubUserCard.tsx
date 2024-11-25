export default function GithubUserCard(props: any) {
    const { login, name, location, email, company, bio, avatar_url } = props.candidateData;
    return (
        <div className="card">
            <img className='search-avatar' src={avatar_url} alt="Avatar" />
            <div className="card-body">
                <h2 className="card-content">{name} ({login})</h2>
                <p className="card-content">Location: {location}</p>
                <p className="card-content">Email: {email}</p>
                <p className="card-content">Company: {company}</p>
                <p className="card-content card-text">Bio: {bio}</p>
            </div>
        </div>
    )
};