import pickle

def load_data(serialized_data):
    # Insecure code: vulnerable to insecure deserialization
    return pickle.loads(serialized_data)

if __name__ == "__main__":
    user_input = input("Enter serialized data: ")
    data = load_data(user_input)
    print(data)
