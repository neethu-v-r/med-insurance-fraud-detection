
from sqlalchemy import Column, Integer, String, Float, DateTime, func, ForeignKey
from sqlalchemy.sql import func
from database import Base

# ✅ User Model
class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

# ✅ Fraud Detection Model
class FraudDetection(Base):
    __tablename__ = "fraud_detection"

    id = Column(Integer, primary_key=True, index=True)
    age = Column(Integer, nullable=False)
    gender = Column(Integer, nullable=False)  # 0 = Male, 1 = Female
    bmi = Column(Float, nullable=False)
    num_claims = Column(Integer, nullable=False)
    num_hospital_visits = Column(Integer, nullable=False)
    has_chronic_disease = Column(Integer, nullable=False)  # 0 = No, 1 = Yes
    claim_amount = Column(Integer, nullable=False)
    claim_reason = Column(Integer, nullable=False)  # Coded reasons
    doctor_visits = Column(Integer, nullable=False)
    days_hospitalized = Column(Integer, nullable=False)
    billing_code_mismatch = Column(Integer, nullable=False)  # 0 = No, 1 = Yes
    insurance_type = Column(Integer, nullable=False)  # 0 = Public, 1 = Private
    policy_lifetime = Column(Integer, nullable=False)
    previous_fraud_claims = Column(Integer, nullable=False)
    claim_per_visit = Column(Integer, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())



 