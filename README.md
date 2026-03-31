# Card Game War 🃏

A classic card game War built with React featuring a modern interface inspired by a poker table. The game offers smooth animations, classic design with green felt and wooden accents, and intuitive gameplay mechanics.

## Features

- Full War game mechanics - random deck shuffling, card value comparison, automatic point allocation to round winner
- Classic poker table look with green felt and wooden frame
- Card counter for each player's deck
- Round result and game over messages
- Reset button available at the end of gameplay

## Tech Stack

<div>
  <img src="https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/-CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/-NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
</div>

## Installation

1. Clone the repository: `git clone <url>`
2. Navigate to project folder: `cd project-name`
3. Install dependencies: `npm install`
4. Run dev server: `npm run dev`
5. Open browser: `http://localhost:5173` or `http://localhost:3000`

## How to Play

1. Click on your deck to draw a card
2. Computer automatically draws its card
3. Higher value card wins (2-10, J=11, Q=12, K=13, A=14)
4. Round winner takes both cards to their deck
5. On tie, cards return to owners
6. Game ends when one player has no cards left
7. Click "New Game" to restart
