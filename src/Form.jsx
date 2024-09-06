
import {useState, useEffect} from 'react';
import './Form.css';



const Form = () => {

    const [currentLink, setCurrentLink] = useState("");
    const [favorite, setFavorite] = useState([]);
    useEffect(() => {
        chrome.storage.local.get(['favorites'], (result) => {
            if (result.favorites) {
                setFavorite(result.favorites);
            }
        });
    }, []);

    // Save links to Chrome storage whenever favorites change
    useEffect(() => {
        chrome.storage.local.set({ favorite });
    }, [favorite]);

    const handleChange = (e) => {
       setCurrentLink(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(currentLink)
       
        setFavorite([...favorite, currentLink])
        setCurrentLink("")
        
    }
    const handledelete =(index) => {
        setFavorite(favorite.filter((_, i) => i !== index))
    }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
            <label htmlFor="" >Favorite Link</label>
            <input type="text"
            id="favoriteLink"
            name="favoritelink"
            required
            value={currentLink}
            onChange={handleChange}
            />
        </div>
        <div>
            <button disabled={!currentLink} type="submit">Add</button>
        </div>
      </form>
      <div>
      {favorite.length > 0 && (
                    <ul>
                        {favorite.map((link, index) => (
                            <li key={index}>
                                {link}
                                <span
                                    className="delete-icon"
                                    onClick={() => handledelete(index)}
                                    aria-label={`Delete ${link}`}
                                >
                                    🗑️
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
      </div>
    </div>
  )
}

export default Form;