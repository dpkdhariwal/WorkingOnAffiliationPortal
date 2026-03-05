CREATE TABLE newage_app_documents_details (
    slno INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Primary key - Auto increment serial number',
    category ENUM("building", "electricity") DEFAULT NULL,
    particular ENUM('BUILDING_PLAN','BCC_SCC','FIRE_SAFETY_CERTIFICATE','LATEST_ELECTRICITY_BILL') DEFAULT NULL,
    document VARCHAR(255) DEFAULT NULL,
    appId VARCHAR(255) DEFAULT NULL
) COMMENT = 'New Age Application Documents';
