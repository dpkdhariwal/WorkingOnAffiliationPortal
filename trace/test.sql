CREATE TABLE newage_industry_entity_details (
    slno INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Primary key - Auto increment serial number',
    name_of_industry VARCHAR(255) NOT NULL COMMENT 'Name of the Industry',
    latitude DECIMAL(10, 8) COMMENT 'Latitude coordinate of Industry location',
    longitude DECIMAL(11, 8) COMMENT 'Longitude coordinate of Industry location',
    website VARCHAR(255) COMMENT 'Official Website URL of the Industry',
    gst_number VARCHAR(20) COMMENT 'GST Number of the Industry',
    tin_tan VARCHAR(20) COMMENT 'TIN or TAN Number of the Industry',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation timestamp',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Record last updated timestamp'
) COMMENT = 'New Age Industry Entity Details';

CREATE TABLE newage_industry_address (
    slno INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Primary key - Auto increment serial number',
    state VARCHAR(255) NOT NULL COMMENT 'State name',
    district VARCHAR(255) NOT NULL COMMENT 'District name',
    city_town VARCHAR(255) NOT NULL COMMENT 'City or Town name',
    pincode VARCHAR(10) NOT NULL COMMENT 'Postal PIN code'
) COMMENT = 'New Age Industry Address';

CREATE TABLE newage_industry_contact_details (
    slno INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Primary key - Auto increment serial number',
    name VARCHAR(255) NOT NULL COMMENT "",
    designation VARCHAR(255) COMMENT "",
    email_id VARCHAR(255) COMMENT "",
    mobile_number VARCHAR(255) COMMENT ""
) COMMENT = 'New Age Industry Contact Details';
------------

CREATE TABLE newage_industry_Eligibility (
    slno INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Primary key - Auto increment serial number',
    total_emp_strength VARCHAR(255) NOT NULL,
    total_emp_strength_document VARCHAR(255) NOT NULL,
    latest_itir_document VARCHAR(255) NOT NULL,
    previous_year_itr_document VARCHAR(255) NOT NULL,
    previous_second_year_itr_document VARCHAR(255) NOT NULL,
    turnover_of_industry VARCHAR(255) NOT NULL,
    chartered_Acc_audited_report_document VARCHAR(255) NOT NULL
) COMMENT = 'New Age Industry Eligibility';

CREATE TABLE newage_institute_entity_details (
    slno INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Primary key - Auto increment serial number',
    institute_id VARCHAR(255) NOT NULL,
    institute_name VARCHAR(255) NOT NULL,
    latitude VARCHAR(255) NOT NULL,
    longitude VARCHAR(255) NOT NULL,
    website VARCHAR(255) NOT NULL,
    email_id VARCHAR(255) NOT NULL
) COMMENT = 'New Age institute Entity Details';

CREATE TABLE newage_institute_address (
    slno INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Primary key - Auto increment serial number',
    state VARCHAR(255) NOT NULL,
    district VARCHAR(255) NOT NULL,
    city_town VARCHAR(255) NOT NULL,
    pincode VARCHAR(255) NOT NULL,
) COMMENT = 'New Age institute Address'

CREATE TABLE newage_institute_contact_details (
    slno INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Primary key - Auto increment serial number',
    name VARCHAR(255) NOT NULL,
    designation VARCHAR(255) NOT NULL,
    email_id VARCHAR(255) NOT NULL,
    mobile_number VARCHAR(255) NOT NULL
) COMMENT = 'New Age institute Contact Details'