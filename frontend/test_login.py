from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time

# User credentials
test_email = 'saurabh20040213@gmail.com'
test_password = '1234'

# Chrome browser open karein
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

# Login page open karein
driver.get("http://localhost:3000/login")

# Wait for email input (by placeholder)
WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Email']"))
)

# Email input fill karein
driver.find_element(By.XPATH, "//input[@placeholder='Email']").send_keys(test_email)

# Password input fill karein
driver.find_element(By.XPATH, "//input[@placeholder='Password']").send_keys(test_password)

# Captcha automate nahi ho sakta (ReCAPTCHA), isliye yahan rukna padega
print("Manual captcha solve karein, phir Enter dabayein...")
input()

# Wait for login button and click
login_btn = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Login')]"))
)
login_btn.click()

# Thoda wait karein (2 seconds)
time.sleep(2)

# Page title print karein (ya koi aur confirmation)
print("Page title after login:", driver.title)

driver.quit() 