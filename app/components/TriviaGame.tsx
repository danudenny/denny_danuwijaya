'use client';

import React from 'react';

export interface TriviaQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const triviaQuestions: TriviaQuestion[] = [
  {
    question: "What does GIS stand for?",
    options: [
      "Global Information System",
      "Geographic Information System",
      "Graphical Interface System",
      "General Integration System"
    ],
    answer: 1,
    explanation: "GIS (Geographic Information System) is a system designed to capture, store, manipulate, analyze, manage, and present spatial or geographic data."
  },
  {
    question: "Which of these is NOT a common GIS data format?",
    options: [
      "Shapefile",
      "GeoJSON",
      "GeoXML",
      "GeoCSS"
    ],
    answer: 3,
    explanation: "GeoCSS is not a real GIS format. Common formats include Shapefile, GeoJSON, GeoTIFF, and KML."
  },
  {
    question: "What is PostgreSQL's spatial extension called?",
    options: [
      "SpatialDB",
      "GeoSQL",
      "PostGIS",
      "PostgreoSpatial"
    ],
    answer: 2,
    explanation: "PostGIS is the spatial database extender for PostgreSQL, adding support for geographic objects and allowing location queries to be run in SQL."
  },
  {
    question: "Which framework is known for its incremental static regeneration feature?",
    options: [
      "Angular",
      "Vue.js",
      "Next.js",
      "React"
    ],
    answer: 2,
    explanation: "Next.js introduced Incremental Static Regeneration (ISR) which allows you to update static pages after you've built your site."
  },
  {
    question: "What is the main purpose of a WebSocket?",
    options: [
      "To style web pages",
      "To enable real-time communication",
      "To store data locally",
      "To compress images"
    ],
    answer: 1,
    explanation: "WebSocket is a protocol that enables real-time, bi-directional communication between a client and server over a single, long-lived connection."
  }
];

export interface GameState {
  currentQuestion: number;
  score: number;
  isActive: boolean;
}

export class TriviaGame {
  private state: GameState;

  constructor() {
    this.state = {
      currentQuestion: -1,
      score: 0,
      isActive: false
    };
  }

  start(): React.ReactNode {
    this.state = {
      currentQuestion: 0,
      score: 0,
      isActive: true
    };
    return this.getCurrentQuestion();
  }

  getCurrentQuestion(): React.ReactNode {
    if (!this.state.isActive || this.state.currentQuestion >= triviaQuestions.length) {
      return null;
    }

    const question = triviaQuestions[this.state.currentQuestion];
    return (
      <div className="text-yellow-400">
        <div className="mb-2">Question {this.state.currentQuestion + 1} of {triviaQuestions.length}</div>
        <div className="font-bold">{question.question}</div>
        <div className="mt-2">
          {question.options.map((option, index) => (
            <div key={index} className="ml-2">
              {index + 1}. {option}
            </div>
          ))}
        </div>
        <div className="mt-2 text-green-400/80">
          Type 'answer [number]' to submit your answer
        </div>
        <div className="text-cyan-400/80">
          Current Score: {this.state.score}/{triviaQuestions.length}
        </div>
      </div>
    );
  }

  answer(answerIndex: number): React.ReactNode {
    if (!this.state.isActive || this.state.currentQuestion >= triviaQuestions.length) {
      return "No active game. Type 'trivia start' to begin a new game.";
    }

    const question = triviaQuestions[this.state.currentQuestion];
    const isCorrect = answerIndex - 1 === question.answer;
    
    if (isCorrect) {
      this.state.score++;
    }

    const result = (
      <div>
        <div className={isCorrect ? "text-green-400" : "text-red-400"}>
          {isCorrect ? "✓ Correct!" : "✗ Incorrect!"}
        </div>
        <div className="text-yellow-400 mt-1">
          {question.explanation}
        </div>
      </div>
    );

    this.state.currentQuestion++;

    if (this.state.currentQuestion >= triviaQuestions.length) {
      this.state.isActive = false;
      return (
        <div>
          {result}
          <div className="mt-4 text-cyan-400">
            Game Over! Final Score: {this.state.score}/{triviaQuestions.length}
            <br />Type 'trivia start' to play again!
          </div>
        </div>
      );
    }

    return (
      <div>
        {result}
        <div className="mt-4">
          {this.getCurrentQuestion()}
        </div>
      </div>
    );
  }

  status(): React.ReactNode {
    if (!this.state.isActive) {
      return (
        <div className="text-yellow-400">
          No active game. Type 'trivia start' to begin a new game!
          <br />Test your knowledge about GIS, Web Development, and more!
        </div>
      );
    }

    return this.getCurrentQuestion();
  }
}
