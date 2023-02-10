import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { Form, Alert } from "react-bootstrap";
import './GuessingGame.module.css';

function Notice () {
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert variant="dark" onClose={() => setShow(false)} dismissible>
          Try entering a letter, or a number over 100 to see what happens.
        </Alert>
      );
    }
    
  }

export function GuessingGame () {

    function getLuckyNum () {
        let num = Math.floor(Math.random() * 100);
        if (num === 0 ) {num++};
        return num;
    }
    
    const guessRecall = parseInt(localStorage.getItem('numberOfGuesses'));
    const luckyRecall = parseInt(localStorage.getItem('luckyNumber'));
    const random = luckyRecall? luckyRecall : getLuckyNum();
    const guessNum = guessRecall? guessRecall : 0;

    const [userGuess, setUserGuess] = useState(null);
    const [guessMessage, setGuessMessage ] = useState('Start Guessing');
    const [randomNumber, setRandomNumber] = useState(random);
    const [numOfGuesses, setNumOfGuesses] = useState(guessNum);
    const [errorMessage, setErrorMessage] = useState('');

    function guessNumber(e) {
        e.preventDefault()
        setNumOfGuesses(numOfGuesses+1);
    
        if (userGuess === randomNumber) {
                setGuessMessage('You guessed the lucky number!')
        } else if (userGuess > randomNumber) {
                setGuessMessage('Your guess is too high!')
        } else if (userGuess < randomNumber) {
                setGuessMessage('Your guess is too low!')
        }

        localStorage.setItem('numberOfGuesses', numOfGuesses);
        localStorage.setItem('luckyNumber', randomNumber);

    } 


    function reset (e) {
        e.preventDefault();
        setUserGuess(null);
        setNumOfGuesses(0);
        setRandomNumber(getLuckyNum());
        localStorage.removeItem('numberOfGuesses');
        localStorage.removeItem('luckyNumber');
        document.getElementById('form').reset();
        setGuessMessage('Start Guessing');
    }


    function errorCheck (e) {
        let input = e.target.value;
        let regex = /\D/
        let tester = regex.test(input);
      
        if (input.length === 0) {
            setErrorMessage('')
        } else if (input > 100) {
            setErrorMessage('Your number is too large');
        } else if (input < 1) {
            setErrorMessage('Your number is too small');
        } else if (tester) {
            setErrorMessage('Invalid data type')
        } else {
            setErrorMessage('')
        }
    }

    useEffect(()=> {
        const ele = document.getElementById('guess');
        const button = document.getElementById('submitButton');

        if (errorMessage.length > 0) {
            ele.classList.add('error');
            button.setAttribute('disabled', true)
        } else {
            ele.classList.remove('error');
            button.removeAttribute('disabled')
        }
    }, [errorMessage])

    function valUpdate (e) {
        errorCheck(e);
        setUserGuess(parseInt(e.target.value))
    }


    return (
        <div>
            <p>I am thinking of a number between 1 and 100. Guess the Lucky Number!</p>
            <p>You have made {numOfGuesses} guesses</p>

            <Form id='form' style={{margin: '0 2rem'}}>
                <Form.Label htmlFor='guess'>Enter a Number between 1 and 100</Form.Label>
                <Notice />
                <Form.Control style={{padding: '10px'}} required id='guess' type='text' name='guess' onChange={(e)=> valUpdate(e) }/>
                <p id='err-message' style={{color: 'red'}}>{errorMessage}</p>
                <br/>
                <Button variant='success' id='submitButton' onClick={(e)=> guessNumber(e)}>Guess</Button>
            </Form>
            <br/>
            <Button variant='secondary' onClick={(e)=> reset(e)}>Reset</Button>
            <br />
            <br/>
            <p>{guessMessage}</p>
            
        </div>
    )
}