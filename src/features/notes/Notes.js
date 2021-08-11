import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardActions from '@material-ui/core/CardActions';
import { Typography } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import { selectCount, deletenote, updatenote } from './noteSlice';
import { CreateForm } from './components/CreateForm';
import TextField from '@material-ui/core/TextField';
import { Dialog , DialogActions, DialogContent, Button, DialogTitle} from '@material-ui/core';


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
	margin: {
		marginTop: "50px",
    margin: theme.spacing(1),
		width: "500px"
  },
}));

export function Notes() {
  const notesList = useSelector(selectCount);
	const classes = useStyles();
  const dispatch = useDispatch();
	const [open, setOpen] = React.useState(false);
	const [email, setEmail] = React.useState("");
	const [name, setName] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [id, setId] = React.useState("");
	const [search, setSearch] = React.useState("");
	const [list, setList] = React.useState(notesList);
	const [errors, setErrors] = React.useState({
		name: false,
		email: false,
		description: false,
	});

	React.useEffect(() => {
		setList(notesList);
	}, [notesList])

  const handleClickOpen = (data) => {
		setEmail(data.email);
		setName(data.name);
		setDescription(data.description);
		setId(data.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	const filterSearch = (val) => {
    setSearch(val);
		var temp = notesList.filter(x => x.email.includes(val));
		setList(temp);
  };

	const updateNote = () => {
		const obj = {
			id: id,
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
			dispatch(updatenote(obj));
			setName("");
			setEmail("");
			setDescription("");
    	setOpen(false);
		}
  };

	const deleteNote = (data) => {
		dispatch(deletenote(data));
		setSearch("");
	};

  return (
    <div>
			<CreateForm />
			<TextField
        className={classes.margin}
        id="input-with-icon-textfield"
        label="Search"
				placeholder="Search with email"
				variant="outlined"
				value={search}
				onChange={e => filterSearch(e.target.value )}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
			<div className="stock-container">
					{notesList.map((data) => {
						const filterData = list.filter(n => n.id === data.id)
						if(filterData.length) {
							return (
								<Card key={data.id} className={classes.root}>
									<CardHeader
										title={data.name}
										subheader={data.email}
									/>
									<CardContent>
										<Typography variant="body2" color="textSecondary" component="p">
											{data.description}
										</Typography>
									</CardContent>
									<CardActions className={classes.cardAct}>
										<IconButton
										onClick={() => handleClickOpen(data)}
										// onClick={handleClickOpen}
										aria-label="add to favorites">
											<EditIcon />
										</IconButton>
										<IconButton
										onClick={() => deleteNote(data)}
										// onClick={() => dispatch(deletenote(data))}
										aria-label="share">
											<DeleteIcon />
										</IconButton>
									</CardActions>
								</Card>
								
							);
						}
					})}
			</div>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Note</DialogTitle>
        <DialogContent>
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
							multiline
          		maxRows={4}
							value={description}
							onChange={e => setDescription(e.target.value )}
							fullWidth
					/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
					onClick={() => updateNote()}
					 color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
