CREATE TABLE newage_proposed_inst_details (
    slno INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Primary key - Auto increment serial number',
    name_of_applicant_institute VARCHAR(255) DEFAULT NULL,
    type_of_institute VARCHAR(255) DEFAULT NULL,
    institute_location VARCHAR(255) DEFAULT NULL,
    latitude VARCHAR(255) DEFAULT NULL,
    longitude VARCHAR(255) DEFAULT NULL
) COMMENT = 'New Age Proposed Institute';

CREATE TABLE newage_proposed_inst_address (
    slno INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Primary key - Auto increment serial number',
    state VARCHAR(255) DEFAULT NULL,
    district VARCHAR(255) DEFAULT NULL,
    sub_district VARCHAR(255) DEFAULT NULL,
    town_city VARCHAR(255) DEFAULT NULL,
    village VARCHAR(255) DEFAULT NULL,
    pincode VARCHAR(255) DEFAULT NULL,
    plot_number_khasara_number VARCHAR(255) DEFAULT NULL,
    landmark VARCHAR(255) DEFAULT NULL
) COMMENT = 'New Age Proposed Institute Address';

CREATE TABLE newage_proposed_inst_auth (
    slno INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Primary key - Auto increment serial number',
    name_of_authorized_signatory VARCHAR(255) DEFAULT NULL,
    designation_of_authorized_signatory VARCHAR(255) DEFAULT NULL,
    email_id_of_authorized_signatory VARCHAR(255) DEFAULT NULL,
    mobile_number_of_authorized_signatory VARCHAR(255) DEFAULT NULL,
    id_proof_of_authorized_signatory VARCHAR(255) DEFAULT NULL,
    id_proof_number_of_authorized_signatory VARCHAR(255) DEFAULT NULL,
    id_proof_docs_of_authorized_signatory VARCHAR(255) DEFAULT NULL
) COMMENT = 'New Age Proposed Institute Authorised Signatory';