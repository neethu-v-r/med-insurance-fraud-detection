"""from sqlalchemy.orm import Session
from models import User
from schemas import UserCreate
from passlib.context import CryptContext
from utils import send_reset_email
from jose import jwt, JWTError
from datetime import datetime, timedelta

# ✅ Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ✅ JWT settings
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

# ✅ Register User
def create_user(db: Session, user_data: UserCreate):
    hashed_password = pwd_context.hash(user_data.password)
    new_user = User(
        username=user_data.username,
        email=user_data.email,
        password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# ✅ Authenticate User (Login)
def authenticate_user(db: Session, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()
    if user and pwd_context.verify(password, user.password):
        return user
    return None

# ✅ Create Access Token (JWT)
def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=15)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# ✅ Decode Access Token (JWT)
def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            return None
        return email
    except JWTError:
        return None

# ✅ Forgot Password (Generate Reset Link)
def forgot_password(db: Session, email: str):
    user = db.query(User).filter(User.email == email).first()
    if user:
        token = create_access_token(data={"sub": user.email}, expires_delta=timedelta(minutes=15))
        send_reset_email(email, token)
        return True
    return False

# ✅ Reset Password (Set New Password)
def reset_password(db: Session, token: str, new_password: str):
    email = decode_access_token(token)
    if not email:
        return False
    
    user = db.query(User).filter(User.email == email).first()
    if user:
        hashed_password = pwd_context.hash(new_password)
        user.password = hashed_password
        db.commit()
        return True
    return False"""
from sqlalchemy.orm import Session
from models import User, FraudDetection
from schemas import UserCreate, InsuranceClaim, FraudDetectionResponse
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ✅ Register User
def create_user(db: Session, user_data: UserCreate):
    hashed_password = pwd_context.hash(user_data.password)
    new_user = User(
        username=user_data.username,
        email=user_data.email,
        password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# ✅ Authenticate User (Login)
def authenticate_user(db: Session, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()
    if user and pwd_context.verify(password, user.password):
        return user
    return None

# ✅ Forgot Password
def reset_password(db: Session, email: str, new_password: str):
    user = db.query(User).filter(User.email == email).first()
    if user:
        hashed_password = pwd_context.hash(new_password)
        user.password = hashed_password
        db.commit()
        return True
    return False

# ✅ Save Insurance Claim Prediction
def save_fraud_detection(db: Session, claim: InsuranceClaim, prediction: int):
    new_claim = FraudDetection(
        age=claim.age,
        gender=claim.gender,
        bmi=claim.bmi,
        num_claims=claim.num_claims,
        num_hospital_visits=claim.num_hospital_visits,
        has_chronic_disease=claim.has_chronic_disease,
        claim_amount=claim.claim_amount,
        claim_reason=claim.claim_reason,
        doctor_visits=claim.doctor_visits,
        days_hospitalized=claim.days_hospitalized,
        billing_code_mismatch=claim.billing_code_mismatch,
        insurance_type=claim.insurance_type,
        policy_lifetime=claim.policy_lifetime,
        previous_fraud_claims=claim.previous_fraud_claims,
        claim_per_visit=claim.claim_per_visit,
        fraud_prediction=prediction
    )
    db.add(new_claim)
    db.commit()
    db.refresh(new_claim)
    return new_claim

# ✅ Get All Fraud Predictions
def get_fraud_predictions(db: Session):
    return db.query(FraudDetection).all()

