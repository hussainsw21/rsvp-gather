CREATE TABLE organizers (
    its_no VARCHAR(8) PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);

INSERT INTO organizers (its_no, password)
VALUES ('60421488', 'hus5152')
ON CONFLICT (its_no) DO NOTHING;

ALTER TABLE events
ADD COLUMN organizer_its_no VARCHAR(8) NOT NULL DEFAULT '60421488';

ALTER TABLE events
ADD CONSTRAINT fk_event_organizer
FOREIGN KEY (organizer_its_no)
REFERENCES organizers(its_no);
