CREATE TABLE newage_land_possesion_of_land_details (
    slno INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Primary key - Auto increment serial number',
    possession_of_land ENUM("owned", "leased") DEFAULT NULL
) COMMENT = 'New Age Possession of Land Details';

CREATE TABLE newage_land_owned_details (
    slno INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Primary key - Auto increment serial number',
    land_owner_name VARCHAR(255) DEFAULT NULL,
    land_registration_number VARCHAR(255) DEFAULT NULL,
    land_document VARCHAR(255) DEFAULT NULL,
    land_area_in_square_metres INT(255) DEFAULT NULL
) COMMENT = 'New Age Owned Land Details';

CREATE TABLE newage_land_leased_details (
    slno INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Primary key - Auto increment serial number',
    name_of_lessor VARCHAR(255) DEFAULT NULL,
    name_of_lessee VARCHAR(255) DEFAULT NULL,
    lease_deed_number VARCHAR(255) DEFAULT NULL,
    date_of_commencement VARCHAR(255) DEFAULT NULL,
    date_of_expiry DATE DEFAULT NULL,
    lease_document VARCHAR(255) DEFAULT NULL,
    land_area_in_square_metres INT(255) DEFAULT NULL
) COMMENT = 'New Age Leased Land Details';