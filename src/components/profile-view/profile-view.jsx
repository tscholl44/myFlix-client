import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { useNavigate } from 'react-router';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

export const ProfileView = ({ user, token, movies, setUser, handleFavoriteUpdate }) => {
    const [updatedUser, setUpdatedUser] = useState(user);
    const [userFavoriteMovies, setFavoriteMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setUpdatedUser(user);
    }, [user]);

    useEffect(() => {
        if (movies && user?.favoriteMovies) {
            const favoriteMoviesList = movies.filter((movie) =>
                user.favoriteMovies.includes(movie._id)
            );
            setFavoriteMovies(favoriteMoviesList);
        } else {
            setFavoriteMovies([]);
        }
    }, [movies, user]);

    const handleUpdate = (event) => {
        event.preventDefault();
        fetch(`https://toms-flix-a1bb67bc1c05.herokuapp.com/users/${user.name}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(updatedUser)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
            return response.json();
        })
        .then(data => {
            setUser(data);
            alert('Profile updated successfully!');
        })
        .catch(error => console.error('Error updating profile:', error));
    };

    const handleDelete = () => {
        if (!window.confirm('Are you sure you want to delete your account?')) return;

        fetch(`https://toms-flix-a1bb67bc1c05.herokuapp.com/users/${user.name}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete account');
            }
            alert('Account deleted successfully');
            setUser(null);
            navigate('/');
        })
        .catch(error => console.error('Error deleting account:', error));
    };

    return (
        <Container className="profile-view profile-container mt-4">
            <Card className="p-4 shadow">
                <h2 className="mb-4 text-center text-white">Profile</h2>
                <Form onSubmit={handleUpdate}>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-white">Username</Form.Label>
                        <Form.Control type="text" value={updatedUser.name} onChange={e => setUpdatedUser({...updatedUser, Username: e.target.value})} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-white">Password</Form.Label>
                        <Form.Control type="password" onChange={e => setUpdatedUser({...updatedUser, Password: e.target.value})} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-white">Email</Form.Label>
                        <Form.Control type="email" value={updatedUser.Email} onChange={e => setUpdatedUser({...updatedUser, Email: e.target.value})} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-white">Date of Birth</Form.Label>
                        <Form.Control type="date" value={updatedUser.Birthday} onChange={e => setUpdatedUser({...updatedUser, Birthday: e.target.value})} required />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">Update Profile</Button>
                </Form>
                <Button variant="danger" onClick={handleDelete} className="w-100 mt-3">Delete Account</Button>
            </Card>
            <h3 className="mt-5 text-white">Favorite Movies</h3>
            <Row className="mt-3">
                {userFavoriteMovies.length > 0 ? (
                    userFavoriteMovies.map(movie => (
                        <Col md={4} key={movie._id} className="mb-3">
                            <MovieCard
                                movie={movie}
                                user={user}
                                setUser={setUser}
                                handleFavoriteUpdate={handleFavoriteUpdate}
                            />
                        </Col>
                    ))
                ) : (
                    <p className="text-center">You have no favorite movies yet.</p>
                )}
            </Row>
        </Container>
    );
};