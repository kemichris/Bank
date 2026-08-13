import { useParams } from 'react-router-dom';

export function UserDetails() {
    const { id } = useParams();

    console.log(id);

    return (
        <div>
            User details page
        </div>
    );
}