import qrcode
import matplotlib.pyplot as plt

def generate_qr(user_id, ride_id):
    qr_data = f"{user_id}-{ride_id}"
    qr = qrcode.make(qr_data)

    plt.imshow(qr,cmap="gray")
    plt.axis("off")
    plt.show()

    filename = f"{user_id}_{ride_id}.png"
    qr.save(filename)
    return filename

#if __name__ == "__main__":
#    filename = generate_qr("user123", "Leviathan")
#    print(f"QR code saved as: {filename}")