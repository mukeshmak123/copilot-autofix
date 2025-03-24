import os

def execute_command(command):
    # Insecure code: vulnerable to remote code execution
    os.system(command)

if __name__ == "__main__":
    user_input = input("Enter command to execute: ")
    execute_command(user_input)
