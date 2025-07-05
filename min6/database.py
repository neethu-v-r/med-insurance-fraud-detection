import os
import logging
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# ✅ Set up logging for debugging
logging.basicConfig(
    format="%(asctime)s - %(levelname)s - %(message)s",
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# ✅ Use an absolute path for the database
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'fraud_detection.db')}"

# ✅ Create the database engine
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# ✅ Create a session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ✅ Define the base class for models
Base = declarative_base()

def create_tables():
    """
    Function to create all tables in the database.
    Ensures that models are imported and registered properly.
    """
    from models import User  # ✅ Import all models
    try:
        logger.info("Creating tables...")
        Base.metadata.create_all(bind=engine)
        logger.info("Tables created successfully!")
    except Exception as e:
        logger.error(f"Error creating tables: {e}")

def get_db():
    """
    Dependency for FastAPI routes to get a database session.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ Test connection manually
def test_connection():
    try:
        with engine.connect() as conn:
            logger.info("Database connected successfully!")
    except Exception as e:
        logger.error(f"Database connection failed: {e}")

if __name__ == "__main__":
    test_connection()
    create_tables()
