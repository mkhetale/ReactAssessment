import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { addnote } from '../noteSlice';


const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: "20px",
		paddingBottom: "20px",
		marginTop: "20px",
		width: "500px"
	},
	homePage: {
			margin: '100px 30px 10px 30px',
			minHeight: '80vh',
			paddingTop: '64px'

	},
	cardAct: {
		float: 'right'
	},
}));

export function CreateForm() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [errors, setErrors] = useState({
		name: false,
		email: false,
		description: false,
	});

	const submitNote = () => {
		const obj = {
			id: Date.now(),
			name: name,
			email: email,
			description: description
		}
		const errorObj = {
			name: false,
			email: false,
			description: false,
		};
		var test = false;
		if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) || !email) {
			errorObj.email = true;
			test = true;
		}
		if (!name || name.length > 20) {
			errorObj.name = true;
			test = true;
		}
		if (!description) {
			errorObj.description = true;
			test = true;
		}
		setErrors(errorObj);
		if(!test) {
			dispatch(addnote(obj));
			setName("");
			setEmail("");
			setDescription("");
		}
	};

  return (
    <div>
			<Card className={classes.root}>
				<CardHeader
					title="Create a Note"
				/>
				<CardContent>
					<TextField
							error={errors.name}
							helperText={errors.name? "Enter valid name": ""}
							autoFocus
							margin="dense"
							id="name"
							name="name"
							label="Name"
							type="text"
							value={name}
							onChange={e => setName(e.target.value )}
							fullWidth
					/>
					<TextField
							error={errors.email}
							helperText={errors.email? "Enter valid email": ""}
							autoFocus
							margin="dense"
							id="email"
							name="emailText"
							label="Email Address"
							type="email"
							value={email}
							onChange={e => setEmail(e.target.value )}
							fullWidth
					/>
					<TextField
							error={errors.description}
							helperText={errors.description? "Enter valid description": ""}
							autoFocus
							margin="dense"
							id="description"
							name="description"
							label="Description"
							type="text"
							value={description}
							onChange={e => setDescription(e.target.value )}
							fullWidth
					/>
				</CardContent>
				<CardActions className={classes.cardAct}>
					<Button 
					onClick = {submitNote}
					size="small">Submit</Button>
				</CardActions>
			</Card>
    </div>
  );
}
