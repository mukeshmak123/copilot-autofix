import pickle

def deserialize_data(data):
    return pickle.loads(data)

# Example usage
data = b"some serialized data"
deserialized_data = deserialize_data(data)
