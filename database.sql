
CREATE TABLE spex(
    spex_id     INT AUTO_INCREMENT,
    spex_name   TEXT,
    context     TEXT,
    PRIMARY KEY(spex_id)
);

CREATE TABLE shows(
    show_id     INT AUTO_INCREMENT,   
    year        VARCHAR(20),
    spex_id     INT,
    PRIMARY KEY(show_id),
    FOREIGN KEY(spex_id) REFERENCES spex(spex_id)
);

CREATE TABLE songs(
	song_id		INT AUTO_INCREMENT,
    song_name   TEXT,
    text        TEXT,
    context     TEXT,
    show_id     INT,
    PRIMARY KEY(song_id),
    FOREIGN KEY(show_id) REFERENCES shows(show_id)
);

CREATE TABLE retakes(
	retake_id	INT AUTO_INCREMENT,
    retake_name TEXT,
    text        TEXT,
    song_id   	INT,
    PRIMARY KEY(retake_id),
    FOREIGN KEY(song_id) REFERENCES songs(song_id)
);