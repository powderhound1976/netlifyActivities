import React, { useContext, useState } from 'react';
import { MovieContext } from './Movie-list';
import { useHistory, useParams } from 'react-router';
import { setYear } from 'date-fns';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as yup from 'yup';
toast.configure();

export function VHelp({ message }) {
	return <p className='help'>{message}</p>;
}

const validationSchema = yup.object({
	title: yup.string().required(),
	year: yup.number().required().min(1900).max(new Date().getFullYear()),
	rated: yup
		.string()
		.matches(/(g|G|pg|PG|pg-13|PG-13|r|R|nc-17|NC-17|xxx|XXX)/,"Valid options are: G, PG, PG-13, R, NC-17, XXX")
		.required(), //Trying to implement matching
	genre: yup.string().required(),
	plot: yup.string().required(),
	poster: yup.string().url().required(),
	rating: yup.number().required(),
	votes: yup.number().required(),
	imdbID: yup.string().required(),
	releaseDate: yup.date(),
});
export default function MovieForm() {
	let { movies, setMovies } = useContext(MovieContext);
	let { mid } = useParams();

	let movie = mid ? movies.find(m => m.id == mid) : {};
	let is_new = mid === undefined;
	let { handleSubmit, handleChange, values, errors, setFieldValue } =
		useFormik({
			initialValues: is_new
				? {
						title: '',
						year: new Date().getFullYear(),
						rated: '',
						genre: '',
						plot: '',
						poster: '',
						rating: '',
						votes: '',
						imdbID: '',
						reviews: '',
						releaseDate: '',
				  }
				: { ...movie },
			validationSchema,
			onSubmit(values) {
				if (is_new) {
					let id = movies.length;
					while (true) {
						let mv = movies.find(m => m.id == id++);
						if (mv === undefined) break;
					}

					values.id = id;
					movies.push(values);
				} else {
					let mv = movies.find(m => m.id == movie.id);
					Object.assign(mv, values);
				}

				setMovies([...movies]);
				history.push('/movies');
				toast(is_new ? 'Successfully added' : 'Successfully updated');
			},
		});

	const history = useHistory();

	return (
		<form onSubmit={handleSubmit}>
			<h1>Adding/Editing a movie</h1>

			<div className='field'>
				<label htmlFor='title'>Title</label>
				<div className='control'>
					<input
						type='text'
						name='title'
						value={values.title}
						onChange={handleChange}
					/>
					<VHelp message={errors.title} />
				</div>
			</div>

			<div className='field'>
				<label htmlFor='title'>Year</label>
				<div className='control'>
					<input
						type='text'
						name='year'
						value={values.year}
						onChange={handleChange}
					/>
					<VHelp message={errors.year} />
				</div>
			</div>

			<div className='field'>
				<label htmlFor='title'>Rated</label>
				<div className='control'>
					<input
						type='text'
						name='rated'
						value={values.rated}
						onChange={handleChange}
					/>
					<VHelp message={errors.rated} />
				</div>
			</div>

			<div className='field'>
				<label htmlFor='title'>Genre</label>
				<div className='control'>
					<input
						type='text'
						name='genre'
						value={values.genre}
						onChange={handleChange}
					/>
					<VHelp message={errors.genre} />
				</div>
			</div>

			<div className='field'>
				<label htmlFor='title'>Poster</label>
				<div className='control'>
					<input
						type='text'
						name='poster'
						value={values.poster}
						onChange={handleChange}
					/>
					<VHelp message={errors.poster} />
				</div>
			</div>

			<div className='field'>
				<label htmlFor='plot'>Plot</label>
				<div className='control'>
					<textarea
						name='plot'
						value={values.plot}
						onChange={handleChange}></textarea>
					<VHelp message={errors.plot} />
				</div>
			</div>

			<div className='field'>
				<label htmlFor='rating'>Rating</label>
				<div className='control'>
					<input
						type='text'
						name='rating'
						value={values.rating}
						onChange={handleChange}
					/>
					<VHelp message={errors.rating} />
				</div>
			</div>

			<div className='field'>
				<label htmlFor='votes'>Votes</label>
				<div className='control'>
					<input
						type='text'
						name='votes'
						value={values.votes}
						onChange={handleChange}
					/>
					<VHelp message={errors.votes} />
				</div>
			</div>

			<div className='field'>
				<label htmlFor='imdbID'>IMDB ID</label>
				<div className='control'>
					<input
						type='text'
						name='imdbID'
						value={values.imdbID}
						onChange={handleChange}
					/>
					<VHelp message={errors.imdbID} />
				</div>
			</div>

			<div className='field'>
				<label htmlFor='reviews'>Reviews</label>
				<div className='control'>
					<input
						type='array'
						name='reviews'
						value={values.reviews}
						onChange={handleChange}
					/>
					<VHelp message={errors.reviews} />
				</div>
			</div>

			<div className='field'>
				<label htmlFor='releaseDate'>Release Date</label>
				<div className='control'>
					<DatePicker
						name='releaseDate'
						selected={values.releaseDate}
						onChange={date => setFieldValue('releaseDate', date)}
					/>
					<VHelp message={errors.releaseDate} />
				</div>
			</div>

			<div className='field'>
				<label></label>
				<div className='control'>
					<button type='submit' className='primary'>
						Submit
					</button>
					<button
						className='primary'
						onClick={() => history.push('/movies')}>
						Cancel
					</button>
				</div>
			</div>
		</form>
	);
}
