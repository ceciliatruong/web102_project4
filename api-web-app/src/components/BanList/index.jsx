import { useEffect } from "react";
export default function BanList({ banList = new Set(), removeFromBanList }) {
    useEffect(() => {
        // Log the updated banList whenever it changes
        console.log(banList);
    }, [banList]);
    return(
        <div>
            <h2>banned tags!</h2>
            {banList.size > 0 ? (
                Array.from(banList).map((tag) => (
                    <button key={tag} onClick={() => removeFromBanList(tag)}>
                        {tag}
                    </button>
                ))
            ) : (
                <p>No tags are currently banned.</p>
            )}
        </div>
    );
};