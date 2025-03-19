import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

export const ProfileView = ({ user, token, movies, setUser }) => {
    const [updatedUser, setUpdatedUser] = useState(user);
    const navigate = useNavigate();

    useEffect(() => {
        setUpdatedUser(user);
    }, [user]);

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put(`https://toms-flix-a1bb67bc1c05.herokuapp.com/users/${user.Username}`, updatedUser, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setUser(response.data);
            alert('Profile updated successfully!');
        })
        .catch(error => console.error('Error updating profile:', error));
    };

    const handleDelete = () => {
        if (!window.confirm('Are you sure you want to delete your account?')) return;
        
        axios.delete(`https://toms-flix-a1bb67bc1c05.herokuapp.com/users/${user.Username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            alert('Account deleted successfully');
            setUser(null);
            navigate('/');
        })
        .catch(error => console.error('Error deleting account:', error));
    };

    const favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m._id));

    return (
        <Container className="profile-view mt-4">
            <Card className="p-4 shadow">
                <h2 className="mb-4 text-center">Profile</h2>
                <Form onSubmit={handleUpdate}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" value={updatedUser.Username} onChange={e => setUpdatedUser({...updatedUser, Username: e.target.value})} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={e => setUpdatedUser({...updatedUser, Password: e.target.value})} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={updatedUser.Email} onChange={e => setUpdatedUser({...updatedUser, Email: e.target.value})} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control type="date" value={updatedUser.Birthday} onChange={e => setUpdatedUser({...updatedUser, Birthday: e.target.value})} required />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">Update Profile</Button>
                </Form>
                <Button variant="danger" onClick={handleDelete} className="w-100 mt-3">Delete Account</Button>
            </Card>
            <h3 className="mt-5">Favorite Movies</h3>
            <Row className="mt-3">
                {favoriteMovies.map(movie => (
                    <Col md={4} key={movie._id} className="mb-3">
                        <MovieCard movie={movie} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};