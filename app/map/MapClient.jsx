"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function MapClient() {
  const [thought, setThought] = useState(null);

  function showThought(text) {
    if (thought === text) {
      setThought(null);
      return;
    }

    setThought(text);
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

      {/* mailbox */}
      <button
        className={`${styles.hotspot} ${styles.mailbox}`}
        onClick={(e) => {
          e.stopPropagation();
          showThought("my mom delivers mail!!");
        }}
      />

      {/* My Home */}
      <button
        className={`${styles.hotspot} ${styles.home}`}
        onClick={(e) => {
          e.stopPropagation();
          showThought("i live here with my family");
        }}
      />

      {/* Swim Lake */}
      <button
        className={`${styles.hotspot} ${styles.lake}`}
        onClick={(e) => {
          e.stopPropagation();
          showThought("we come here when it is warm");
        }}
      />

      {/* Big Rock */}
      <button
        className={`${styles.hotspot} ${styles.rock}`}
        onClick={(e) => {
          e.stopPropagation();
          showThought("best barking spot");
        }}
      />

      {/* green ball */}
      <button
        className={`${styles.hotspot} ${styles.ball}`}
        onClick={(e) => {
          e.stopPropagation();
          showThought("hey! that is my ball!!");
        }}
      />

      {/* girlfriend */}
      <button
        className={`${styles.hotspot} ${styles.girlfriend}`}
        onClick={(e) => {
          e.stopPropagation();
          showThought("girlfriend what are you doing there?!");
        }}
      />

      {/* Grandma's House */}
      <button
        className={`${styles.hotspot} ${styles.grandma}`}
        onClick={(e) => {
          e.stopPropagation();
          showThought("i love her so much");
        }}
      />

      {/* garbage can */}
      <button
        className={`${styles.hotspot} ${styles.garbage}`}
        onClick={(e) => {
          e.stopPropagation();
          showThought("the garbage truck comes here");
        }}
      />

      {/* sticks */}
      <button
        className={`${styles.hotspot} ${styles.sticks}`}
        onClick={(e) => {
          e.stopPropagation();
          showThought("these are important sticks");
        }}
      />

      {/* thomas House */}
      <button
        className={`${styles.hotspot} ${styles.thomashouse}`}
        onClick={(e) => {
          e.stopPropagation();
          showThought("thomas lives here");
        }}
      />

      {/* Blueberry Woods */}
      <button
        className={`${styles.hotspot} ${styles.woods}`}
        onClick={(e) => {
          e.stopPropagation();
          showThought("sometimes we look for blueberries here");
        }}
      />

      {/* Vet */}
      <button
        className={`${styles.hotspot} ${styles.vet}`}
        onClick={(e) => {
          e.stopPropagation();
          showThought("they help dogs here");
        }}
      />

      {thought && (
        <div className={styles.noteOverlay}>
          <div
            className={styles.thought}
            onClick={(e) => {
              e.stopPropagation();
              setThought(null);
            }}
          >
            {thought}
          </div>
        </div>
      )}
    </div>
  );
}