"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function MapClient() {
  const [thought, setThought] = useState(null);

  function showThought(text, x, y) {
    if (thought?.text === text) {
      setThought(null);
      return;
    }

    setThought({ text, x, y });
  }

  return (
    <div
      className={styles.mapContainer}
      onClick={() => setThought(null)}
    >
      <img
        src="/images/map2.png"
        alt="Map of Viggo's world"
        draggable={false}
      />

      {/* My Home */}
      <button
        className={`${styles.hotspot} ${styles.home}`}
        onClick={(e) => {
          e.stopPropagation();
          showThought(
            "i live here with my family",
            "26%",
            "32%"
          );
        }}
      />

      {/* Swim Lake */}
      <button
        className={`${styles.hotspot} ${styles.lake}`}
        onClick={(e) => {
          e.stopPropagation();
          showThought(
            "we come here when it is warm",
            "54%",
            "35%"
          );
        }}
      />

      {/* Big Rock */}
      <button
        className={`${styles.hotspot} ${styles.rock}`}
        onClick={(e) => {
          e.stopPropagation();
          showThought(
            "best barking spot",
            "56%",
            "12%"
          );
        }}
      />

      {/* green ball */}
      <button
        className={`${styles.hotspot} ${styles.ball}`}
        onClick={(e) => {
          e.stopPropagation();
          showThought(
            "hey! that is my ball!!",
            "70%",
            "30%"
          );
        }}
      />

      {/* girlfriend */}
      <button
        className={`${styles.hotspot} ${styles.girlfriend}`}
        onClick={(e) => {
          e.stopPropagation();
          showThought(
            "girlfriend what are you doing there?!",
            "80%",
            "25%"
          );
        }}
      />

      {/* Grandma's House */}
      <button
        className={`${styles.hotspot} ${styles.grandma}`}
        onClick={(e) => {
          e.stopPropagation();
          showThought(
            "i love her so much",
            "18%",
            "72%"
          );
        }}
      />

     {/* garbage can */}
      <button
        className={`${styles.hotspot} ${styles.garbage}`}
        onClick={(e) => {
          e.stopPropagation();
          showThought(
            "the garbage truck comes here",
            "35%",
            "77%"
          );
        }}
      />

   {/* sticks */}
      <button
        className={`${styles.hotspot} ${styles.sticks}`}
        onClick={(e) => {
          e.stopPropagation();
          showThought(
            "these are important sticks",
            "55%",
            "57%"
          );
        }}
      />

      {/* thomas House */}
      <button
        className={`${styles.hotspot} ${styles.thomashouse}`}
        onClick={(e) => {
          e.stopPropagation();
          showThought(
            "thomas lives here",
            "18%",
            "32%"
          );
        }}
      />

      {/* Blueberry Woods */}
      <button
        className={`${styles.hotspot} ${styles.woods}`}
        onClick={(e) => {
          e.stopPropagation();
          showThought(
            "sometimes we look for blueberries here",
            "22%",
            "15%"
          );
        }}
      />

      {/* Vet */}
      <button
        className={`${styles.hotspot} ${styles.vet}`}
        onClick={(e) => {
          e.stopPropagation();
          showThought(
            "they help dogs here",
            "78%",
            "72%"
          );
        }}
      />

      {thought && (
        <div
          className={styles.thought}
          style={{
            left: thought.x,
            top: thought.y,
          }}
        >
          {thought.text}
        </div>
      )}
    </div>
  );
}